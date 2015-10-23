'use strict';

angular.module('xyz.controllers')
.controller('UserUpdateCtrl', ['$scope', '$state', '$stateParams', 'User', function($scope, $state, $stateParams, User){
	$scope.pageTitle= 'Create Admin';
	$scope.formTitle= 'Form Create Admin';
	$scope.model= User.get({id:$stateParams.id}, function(model){
		var arr = model.image.split('/');
		var i = arr.length-1;
		$scope.model.nama_file_display =arr[i]; 
		delete $scope.model.image;
	});
	$scope.update= function(){
		delete $scope.model.nama_file_display;
		User.update($scope.model, function(){
			console.log($scope.model.id);
			$state.go('user-profile', {id: $scope.model.id});
		});
	};
}]);