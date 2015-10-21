'use strict';
angular.module('xyz.controllers')
.controller('ProjectRequestListCtrl',  ['$scope','ProjectRequest', function($scope, ProjectRequest){
	$scope.currentPage = 1;
	$scope.pageSize = 5;
	$scope.maxSize = 10;
	$scope.is_active = 1;

	ProjectRequest.query({limit:$scope.pageSize, page:$scope.currentPage}, function(data){
		$scope.projectRequests = data.data;
		$scope.total = data.total;	
	});
	
	function refresh(){
		return ProjectRequest.query({limit:$scope.pageSize, page:$scope.currentPage}, function(data){
			$scope.projectRequests = data.data;
			$scope.total = data.total;	
		});
	};

	$scope.pageChanged = function() {
		refresh()
	};

}]);