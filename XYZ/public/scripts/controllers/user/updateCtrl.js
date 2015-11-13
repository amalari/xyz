'use strict';

angular.module('xyz.controllers')
.controller('UserUpdateCtrl', ['$scope', '$state', '$stateParams', 'User', function($scope, $state, $stateParams, User){
	$scope.pageTitle= 'Create Admin';
	$scope.formTitle= 'Form Create Admin';
	$scope.hiddenNameImage = true;
	$scope.model= User.get({id:$stateParams.id}, function(model){
		$scope.password.id = model.id
		var arr = model.image.split('/');
		var i = arr.length-1;
		$scope.model.nama_file_display =arr[i];
		if($scope.model.nama_file_display !== "undefined"){
			console.log("kalau nama_file_display undifined harus kesini")
			$scope.hiddenNameImage = false;
		};
		delete $scope.model.image;
	});
	$scope.update= function(){
		delete $scope.model.nama_file_display;
		User.update($scope.model, function(){
			console.log($scope.model);
			$state.go('user-profile', {id: $scope.model.id});
		});
	};
	$scope.password = {};
	$scope.updatePassword= function(){
		User.update($scope.password, function(){
			$state.go('user-profile', {id: $scope.model.id});
		})
	}
}]);