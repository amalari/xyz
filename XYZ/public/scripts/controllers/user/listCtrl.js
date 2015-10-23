'use strict';
angular.module('xyz.controllers')
.controller('UserListCtrl',  ['$scope','User', '$log', function($scope, User, $log){
	// $scope.currentPage = 1;
	// $scope.pageSize = 5;
	// $scope.maxSize = 10;

	// $scope.pageChanged = function() {

	// 	User.query({limit:5, page:$scope.currentPage}, function(data){
	// 		console.log(data);
	// 		$scope.users = data.data;
	// 		$scope.total = data.total;	
	// 	});

	// };

	var refresh = function(){
		return User.query(function(list){
			$scope.users = list.data;
			console.log($scope.users);

		})
	};

	User.query(function(list){
		$scope.users = list.data;
		console.log($scope.users);
	});

	$scope.remove = function(userId, fullname){
		console.log(userId);
		if(confirm('Anda yakin akan menghapus user ' + fullname + '?')){
			console.log(userId);
			User.remove({id:userId}, function(){
				refresh();
			})
		}
	};
}]);