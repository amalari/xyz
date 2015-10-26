'use strict';

angular.module('xyz.controllers')
.controller('PostUpdateCtrl', ['$scope', '$state', '$stateParams', 'Post', function($scope, $state, $stateParams, Post){
	$scope.pageTitle= 'Edit Posting';
	$scope.formTitle= 'Form Edit Posting';
	$scope.model= Post.get({id:$stateParams.id});
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