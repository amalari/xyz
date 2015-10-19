'use strict';
angular.module('xyz.controllers')
.controller('PostListCtrl',  ['$scope','Post','$state', function($scope, Post, $state){
	$scope.currentPage = 1;
	$scope.pageSize = 5;
	$scope.maxSize = 10;
	$scope.is_active = 1;


	Post.query({limit:$scope.pageSize, page:$scope.currentPage, type:1, is_active:$scope.is_active}, function(data){
		$scope.posts = data.data;
		$scope.total = data.total;	
	});

	function refresh(){
		return Post.query({limit:$scope.pageSize, page:$scope.currentPage, type:1, is_active:$scope.is_active}, function(data){
			$scope.posts = data.data;
			$scope.total = data.total;	
		});
	};

	$scope.pageChanged = function() {
		refresh()

	};

	$scope.activeTab = function(is_active){
		$scope.is_active = is_active;
		refresh()
	};

	$scope.remove = function(postingId, titlePost){
		if(confirm('Anda yakin akan menghapus poting ' + titlePost + '?')){
			Post.remove({id:postingId}, function(){
				refresh()
			});
		}
	};
}]);