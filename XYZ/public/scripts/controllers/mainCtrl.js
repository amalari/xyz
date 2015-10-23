'use strict';

angular.module('xyz.controllers')
.controller('MainCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'CurrentUser', function($scope, $rootScope, $state, $stateParams, CurrentUser){

	CurrentUser.get(function(user){
		$rootScope.currentUser = user;
	});
}]);