'use strict';

angular.module('xyz.controllers')
.controller('ProjectRequestDetailCtrl', ['$scope', '$state', '$stateParams', 'ProjectRequest', function($scope, $state, $stateParams, ProjectRequest){

	console.log($stateParams.id)
	$scope.projectRequest = ProjectRequest.get({id:$stateParams.id});
}]);