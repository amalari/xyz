'use strict';

angular.module('xyz.controllers')
.controller('PortfolioUpdateCtrl', ['$scope', '$state', '$stateParams', 'Portfolio', 'Category', 'Image', 'ENV', function($scope, $state, $stateParams, Portfolio, Category, Image, ENV){
	$scope.pageTitle= 'Edit Portfolio';
	$scope.formTitle= 'Form Edit Portfolio';
	Category.query(function(list){
		$scope.categories = list.data
	});
	$scope.model= Portfolio.get({id:$stateParams.id}, function(model){
		var arr = model.header_image.split('/');
		var i = arr.length-1;
		$scope.model.nama_file_display =arr[i]; 
		delete $scope.model.header_image;
	});
	$scope.clickSave = function(is_active){
		$scope.model.is_active = is_active;
	};
	$scope.save = function(){
		Portfolio.update($scope.model, function(){
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