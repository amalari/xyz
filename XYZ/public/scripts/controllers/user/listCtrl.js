'use strict';
angular.module('xyz.controllers')
.controller('UserListCtrl',  ['$scope','User', function($scope, User){
	var refresh = function(){
		return User.query(function(list){
			$scope.users = list.data;
		})
	};
	User.query(function(list){
		$scope.users = list.data;
	});
	$scope.remove = function(userId, fullname){
		if(confirm('Anda yakin akan menghapus user ' + fullname + '?')){
			User.remove({id:userId}, function(){
				refresh();
			})
		}
	};
}]);