'use strict';

angular.module('xyz.controllers')
.controller('PageCreateCtrl', ['$scope', 'Post', '$state', function($scope, Post, $state){
	$scope.pageTitle= 'Create Page';
	$scope.formTitle= 'Form Create Page';
	$scope.model= {};
	$scope.types = [{id : 2, name : "About"}, {id: 3, name: "Contact"}];
	$scope.clickSave = function(is_active){
		$scope.model.is_active = is_active;
	};
	$scope.save= function(){
		console.log($scope.model);
		Post.save($scope.model, function(){
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
			'tinyvision': 'http://localhost:3003/scripts/dependencies/tinyvision/plugin.min.js'
		},
		height: '300',
		menubar: false,
		statusbar: false,
		tinyvision: {
			source: 'http://localhost:3003/scripts/testImageList.json',
			upload: function () {
				var message = 'While TinyVision purposely doesn\'t provide upload functionality to keep things simple, it does ' +
				'provide the ability to hook in your own when the "Upload" button is pressed. Or you can disable ' +
				'it completely.';

				tinymce.activeEditor.windowManager.alert(message);
			}
		}
	};
}]);