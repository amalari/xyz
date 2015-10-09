'use strict';

angular.module('xyz.controllers')
.controller('UserUpdateCtrl', ['$scope', '$state', '$stateParams', 'User', function($scope, $state, $stateParams, User){
	$scope.pageTitle= 'Create Admin';
	$scope.formTitle= 'Form Create Admin';
	$scope.model= User.get({id:$stateParams.id});
	$scope.update= function(){
		User.update($scope.model, function(){
			$state.go('user');
		});
	};
}]);