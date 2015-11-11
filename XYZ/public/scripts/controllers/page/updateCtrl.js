'use strict';

angular.module('xyz.controllers')
.controller('PageUpdateCtrl', ['$scope', '$state', '$stateParams', 'Post', function($scope, $state, $stateParams, Post){
	$scope.pageTitle= 'Edit Page';
	$scope.formTitle= 'Form Edit Page';
	$scope.types = [{id : 2, name : "About"}, {id: 3, name: "Contact"}];
	$scope.model= Post.get({id:$stateParams.id});
	$scope.clickSave = function(is_active){
		$scope.model.is_active = is_active;
	};
	$scope.save = function(){
		console.log($scope.model);
		Post.update($scope.model, function(){
			$state.go('page');
		});
	};
}]);