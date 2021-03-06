'use strict';

angular.module('xyz.controllers')
.controller('PostUpdateCtrl', ['$scope', '$state', '$stateParams', 'Post', 'Category', 'Image', 'ENV', function($scope, $state, $stateParams, Post, Category, Image, ENV){
	$scope.pageTitle= 'Edit Posting';
	$scope.formTitle= 'Form Edit Posting';
	$scope.selectedCategory = false;
	$scope.update = true;
	$scope.model= Post.get({id:$stateParams.id}, function(model){
		var arr = model.header_image.split('/');
		var i = arr.length-1;
		$scope.model.nama_file_display =arr[i]; 
		delete $scope.model.header_image;
	});
	Category.query(function(list){
		$scope.categories = list.data;
	});
	$scope.clickSave = function(is_active, type){
		$scope.model.is_active = is_active;
		$scope.model.type = type;
	};
	$scope.save = function(){
		Post.update($scope.model, function(){
			$state.go('post');
		});
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