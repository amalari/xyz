'use strict';

angular.module('xyz.controllers')
.controller('UserCreateCtrl', ['$scope', 'User', '$state', 'Image', 'ENV', function($scope, User, $state, Image, ENV){
	$scope.pageTitle= 'Create Admin';
	$scope.formTitle= 'Form Create Admin';
	$scope.model= {};
	$scope.save= function(){
		User.save($scope.model, function(){
			$state.go('user');	
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