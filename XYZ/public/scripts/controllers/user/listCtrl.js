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

	User.query(function(list){
		$scope.users = list;
		console.log($scope.users);

	});

	$scope.remove = function(id, username){
		console.log(User.get({id:id}));
		if(confirm('Anda yakin akan menghapus user ' + username + '?')){
			User.remove({id:id}, function(){
				User.query({limit:$scope.pageSize, page:1}, function(data){
					console.log(data);
					$scope.users = data.data;
					$scope.total = data.total;	
				});	
			});
		}
	};
}]);