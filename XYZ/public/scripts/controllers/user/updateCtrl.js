'use strict';

angular.module('xyz.controllers')
.controller('UserUpdateCtrl', ['$scope', '$state', '$stateParams', '$http', 'User','ENV', function($scope, $state, $stateParams, $http, User, ENV){
	$scope.pageTitle= 'Create Admin';
	$scope.formTitle= 'Form Create Admin';
	$scope.hiddenNameImage = true;
	$scope.hiddenAlertFailed = true;
	$scope.hiddenAlertSuccess = true;
	$scope.alertForConfirmPassword = true;
	$scope.model= User.get({id:$stateParams.id}, function(model){
		$scope.password.id = model.id
		var arr = model.image.split('/');
		var i = arr.length-1;
		$scope.model.nama_file_display =arr[i];
		if($scope.model.nama_file_display !== "undefined"){
			$scope.hiddenNameImage = false;
		};
		delete $scope.model.image;
	});
	$scope.update= function(){
		delete $scope.model.nama_file_display;
		User.update($scope.model, function(){
			$state.go('user-profile', {id: $scope.model.id});
		});
	};
	$scope.cancel  =function(){
		$('.bs-example-modal-sm').modal('hide');
	};
	$scope.password = {};
	$scope.updatePassword= function(){
		if($scope.password.newPass === $scope.password.confirmPass){
			User.update($scope.password, function(data){
				$scope.message = data.message;
				if(data.success){
					$scope.hiddenAlertSuccess = false;
				} else {
					$scope.hiddenAlertFailed = false;
				};
				delete $scope.password;
				$scope.cancel();
			})
		} else {
			var id = $scope.password.id;
			delete $scope.password;
			$scope.password = {};
			$scope.password.id = id;
			return $scope.alertForConfirmPassword = false;
		}
	};
}]);