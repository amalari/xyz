'use strict';

angular.module('xyz.controllers')
.controller('PageCreateCtrl', ['$scope', 'Post', '$state', function($scope, Post, $state){
	$scope.pageTitle= 'Create Page';
	$scope.formTitle= 'Form Create Page';
	$scope.model= {};
	$scope.clickSave = function(is_active, type){
		$scope.model.is_active = is_active;
		$scope.model.type = type;
	};
	$scope.save= function(){
		console.log($scope.model);
		Post.save($scope.model, function(){
			$state.go('page');	
		});
	};
}]);