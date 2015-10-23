'use strict';

angular.module('xyz.controllers')
.controller('UserCreateCtrl', ['$scope', 'User', '$state', function($scope, User, $state){
	$scope.pageTitle= 'Create Admin';
	$scope.formTitle= 'Form Create Admin';
	$scope.model= {};
	$scope.save= function(){
		console.log($scope.model);
		User.save($scope.model, function(){
			$state.go('user');	
		});
	};
}]);