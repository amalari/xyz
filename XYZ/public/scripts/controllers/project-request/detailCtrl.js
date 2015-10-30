'use strict';

angular.module('xyz.controllers')
.controller('ProjectRequestDetailCtrl', ['$scope', '$state', '$stateParams', 'ProjectRequest', function($scope, $state, $stateParams, ProjectRequest){

	ProjectRequest.get({id:$stateParams.id}, function(data){
		$scope.projectRequest = data;
		console.log(data);
	});
}]);