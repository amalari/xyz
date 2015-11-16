'use strict';

angular.module('xyz.controllers')
.controller('UserProfileCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'User', function($scope,$rootScope, $state, $stateParams, User){
	User.get({id:$stateParams.id}, function(user){
		$scope.user = user;
		$rootScope.currentUser = user;
	});
}]);