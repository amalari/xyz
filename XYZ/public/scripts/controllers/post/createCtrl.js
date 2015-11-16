'use strict';

angular.module('xyz.controllers')
.controller('PostCreateCtrl', ['$scope', 'Post', 'Category', '$state', 'Image', 'ENV', function($scope, Post, Category, $state, Image, ENV){
	$scope.pageTitle= 'Add New';
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
	};
	$scope.saveCategory = function(categoryId, is_active){
		$scope.singleCategory.categoryId = categoryId;
		$scope.singleCategory.is_active = is_active;
		if($scope.singleCategory.categoryId === undefined){
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
			'tinyvision':ENV.apiEndpoint + '/scripts/dependencies/tinyvision/plugin.min.js'
		},
		height: '300',
		menubar: false,
		statusbar: false,
		tinyvision: {
			source: ENV.apiEndpoint + '/image',
			upload: function () {
				var fileUploader = $('#tinyvision-file-input');
				if(!fileUploader.length){
					fileUploader = $('<input />');
					fileUploader.attr({
						id : 'tinyvision-file-input',
						type : 'file'
					});
					fileUploader.change(function(){
						Image.save({files : $(this)[0].files}, function(){
							var iframe = $('iframe'); // or some other selector to get the iframe
							$('#refresh', iframe.contents()).click();
						});
					})
					fileUploader.appendTo('body');					
				}
				fileUploader.click();
			}
		}
	};

}]);