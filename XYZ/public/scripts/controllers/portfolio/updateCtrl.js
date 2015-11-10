'use strict';

angular.module('xyz.controllers')
.controller('PortfolioUpdateCtrl', ['$scope', '$state', '$stateParams', 'Portfolio', 'Category', function($scope, $state, $stateParams, Portfolio, Category){
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
}]);