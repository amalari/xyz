'use strict';

angular.module('xyz.controllers')
.controller('ProjectRequestDetailCtrl', ['$scope', '$state', '$stateParams', 'ProjectRequest', '$document', function($scope, $state, $stateParams, ProjectRequest, $document){
	var self = this;
	ProjectRequest.get({id:$stateParams.id}, function(data){
		$scope.projectRequest = data;
		$scope.albumGoogleSS = [];
		$scope.albumDesignRef = [];
		data.google_earth_file.forEach(function(image){
			var obj1 = {};
			obj1.thumb = image;
			obj1.img = image;
			$scope.albumGoogleSS.push(obj1);
		});
		data.design_reference_file.forEach(function(image){
			var obj2 = {};
			obj2.thumb = image;
			obj2.img = image;
			$scope.albumDesignRef.push(obj2);
		});
	});
}]);