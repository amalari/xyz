'use strict';
angular.module('xyz.controllers')
.controller('PortfolioListCtrl',  ['$scope','Portfolio', function($scope, Portfolio){
	$scope.currentPage = 1;
	$scope.pageSize = 5;
	$scope.maxSize = 10;
	$scope.is_active = 1;

	Portfolio.query({limit:$scope.pageSize, page:$scope.currentPage, is_active:$scope.is_active}, function(data){
		$scope.portfolios = data.data;
		$scope.total = data.total;	
	});
	function refresh(){
		return Portfolio.query({limit:$scope.pageSize, page:$scope.currentPage, is_active:$scope.is_active}, function(data){
			$scope.portfolios = data.data;
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
	$scope.remove = function(portfolioId, titlePortfolio){
		if(confirm('Anda yakin akan menghapus portofolio ' + titlePortfolio + '?')){
			Portfolio.remove({id:portfolioId}, function(){
				refresh();
			});
		}
	};
}]);