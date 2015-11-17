'use strict';

angular.module('xyz.controllers')
.controller('UserProfileCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', 'User', function($scope,$rootScope, $state, $stateParams, $sce, User){
	User.get({id:$stateParams.id}, function(user){
		$scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(user.description);
		$scope.user = user;
		$rootScope.currentUser = user;
	});
}]);