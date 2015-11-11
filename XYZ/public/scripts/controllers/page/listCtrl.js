'use strict';
angular.module('xyz.controllers')
.controller('PageListCtrl',  ['$scope','Post', function($scope, Post){
	$scope.currentPage = 1;
	$scope.pageSize = 5;
	$scope.maxSize = 10;
	$scope.is_active = 1;

	Post.query({limit:$scope.pageSize, page:$scope.currentPage, type:2, is_active:$scope.is_active}, function(data){
		$scope.pages = data.data;
		$scope.total = data.total;	
	});
	
	function refresh(){
		return Post.query({limit:$scope.pageSize, page:$scope.currentPage, type:2, is_active:$scope.is_active}, function(data){
			$scope.pages = data.data;
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

	$scope.remove = function(pageId, titlePage){
		if(confirm('Anda yakin akan menghapus page ' + titlePage + '?')){
			Post.remove({id:pageId}, function(){
				refresh();
			});
		}
	};
}]);