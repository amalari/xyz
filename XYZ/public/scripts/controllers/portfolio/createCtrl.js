'use strict';

angular.module('xyz.controllers')
.controller('PortfolioCreateCtrl', ['$scope', 'Portfolio', '$state', 'ENV', function($scope, Portfolio, $state, ENV){
	$scope.pageTitle= 'Create Portfolio';
	$scope.formTitle= 'Form Create Portfolio';
	$scope.model= {};
	$scope.clickSave = function(is_active){
		$scope.model.is_active = is_active;
	};
	$scope.save= function(){
		console.log($scope.model);
		Portfolio.save($scope.model, function(){
			$state.go('portfolio');	
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