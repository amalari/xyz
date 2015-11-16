'use strict';

angular.module('xyz.controllers')
.controller('PageUpdateCtrl', ['$scope', '$state', '$stateParams', 'Post', 'Image', 'ENV', function($scope, $state, $stateParams, Post, Image, ENV){
	$scope.pageTitle= 'Edit Page';
	$scope.formTitle= 'Form Edit Page';
	$scope.types = [{id : 2, name : "About"}, {id: 3, name: "Contact"}];
	$scope.model= Post.get({id:$stateParams.id});
	$scope.clickSave = function(is_active){
		$scope.model.is_active = is_active;
	};
	$scope.save = function(){
		Post.update($scope.model, function(){
			$state.go('page');
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