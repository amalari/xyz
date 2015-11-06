'use strict';

angular.module('xyz.controllers')
.controller('PortfolioCreateCtrl', ['$scope', 'Portfolio', 'Category', '$state', 'ENV', function($scope, Portfolio, Category, $state, ENV){
	$scope.pageTitle= 'Create Portfolio';
	$scope.formTitle= 'Form Create Portfolio';
	$scope.model= {};
	$scope.model3={};
	$scope.hiddenButton = false;
	Category.query(function(list){
		$scope.model2 = list.data
	});
	$scope.clickSave = function(is_active){
		$scope.model.is_active = is_active;
	};
	$scope.save= function(){
		console.log($scope.model);
		Portfolio.save($scope.model, function(){
			$state.go('portfolio');	
		});
	};
	$scope.updateCategory = function(categoryId){
		$scope.hiddenButton = true;
		Category.get({id: categoryId}, function(data){
			$scope.model3 = data
		})
	};
	$scope.cancelUpdate = function(){
		delete $scope.model3;
		$scope.hiddenButton = false
		console.log($scope.model3);
	};
	$scope.saveCategory = function(categoryId, is_active){
		$scope.model3.categoryId = categoryId;
		$scope.model3.is_active = is_active;
		console.log($scope.model3);
		if($scope.model3.categoryId === undefined){
			console.log("jika category id undifined");
			Category.save($scope.model3, function(){
				$state.go('portfolio-create', {}, {reload: true})
			})
		} else {
			Category.update($scope.model3, function(){
				$state.go('portfolio-create', {}, {reload: true})
			})
		};
	};
	$scope.removeCategory = function(categoryId){
		Category.get({id: categoryId}, function(data){
			$scope.model3 = data
			$scope.saveCategory(categoryId, 0)
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