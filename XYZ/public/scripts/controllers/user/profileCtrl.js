'use strict';

angular.module('xyz.controllers')
.controller('UserProfileCtrl', ['$scope', '$state', '$stateParams', 'User', function($scope, $state, $stateParams, User){

	User.get({id:$stateParams.id}, function(user){
		console.log(user);
		$scope.user = user;
	});
}]);