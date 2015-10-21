'use strict';

angular.module('xyz.controllers')
.controller('PortfolioUpdateCtrl', ['$scope', '$state', '$stateParams', 'Portfolio', function($scope, $state, $stateParams, Portfolio){
	$scope.pageTitle= 'Edit Portfolio';
	$scope.formTitle= 'Form Edit Portfolio';
	$scope.model= Portfolio.get({id:$stateParams.id});
	$scope.clickSave = function(is_active){
		$scope.model.is_active = is_active;
	};
	$scope.save = function(){
		Portfolio.update($scope.model, function(){
			$state.go('portfolio');
		});
	};
}]);