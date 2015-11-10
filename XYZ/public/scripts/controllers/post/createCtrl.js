'use strict';

angular.module('xyz.controllers')
.controller('PostCreateCtrl', ['$scope', 'Post', 'Category', 'TinyVision', '$state', function($scope, Post, Category, TinyVision, $state){
	$scope.pageTitle= 'Create Post';
	$scope.formTitle= 'Form Create Post';
	$scope.model= {};
	$scope.singleCategory={};
	$scope.hiddenButton = false;
	Category.query(function(list){
		$scope.categories = list.data
	});
	$scope.clickSave = function(is_active, type){
		$scope.model.is_active = is_active;
		$scope.model.type = type;
	};
	$scope.save= function(){
		console.log($scope.model);
		Post.save($scope.model, function(){
			$state.go('post');	
		});
	};
	$scope.updateCategory = function(categoryId){
		$scope.hiddenButton = true;
		Category.get({id: categoryId}, function(data){
			$scope.singleCategory = data
		})
	};
	$scope.cancelUpdate = function(){
		delete $scope.singleCategory;
		$scope.hiddenButton = false
		console.log($scope.singleCategory);
	};
	$scope.saveCategory = function(categoryId, is_active){
		$scope.singleCategory.categoryId = categoryId;
		$scope.singleCategory.is_active = is_active;
		console.log($scope.singleCategory);
		if($scope.singleCategory.categoryId === undefined){
			console.log("jika category id undifined");
			Category.save($scope.singleCategory, function(){
				$state.go('post-create', {}, {reload: true})
			})
		} else {
			Category.update($scope.singleCategory, function(){
				$state.go('post-create', {}, {reload: true})
			})
		};
	};
	$scope.removeCategory = function(categoryId){
		Category.get({id: categoryId}, function(data){
			data.categoryId = categoryId;
			data.is_active = 0;
			Category.update(data, function(){
				$state.go('post-create', {}, {reload: true})
			})
		})
	};
	$scope.tinymceOptions = {
		onChange: function(e) {
		},
		inline: false,
		plugins : 'advlist autolink link image lists charmap print preview tinyvision',
		skin: 'lightgray',
		theme : 'modern',
		external_plugins: {
			'tinyvision': 'http://localhost:3003/scripts/dependencies/tinyvision/plugin.min.js'
		},
		height: '300',
		menubar: false,
		statusbar: false,
		tinyvision: {
			source: 'http://localhost:3003/list/image',
			upload: function () {
				var message = 'While TinyVision purposely doesn\'t provide upload functionality to keep things simple, it does ' +
				'provide the ability to hook in your own when the "Upload" button is pressed. Or you can disable ' +
				'it completely.';

				tinymce.activeEditor.windowManager.alert(message);
			}
		}
	};

}]);