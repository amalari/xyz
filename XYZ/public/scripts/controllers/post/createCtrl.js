'use strict';

angular.module('xyz.controllers')
.controller('PostCreateCtrl', ['$scope', 'Post', '$state', function($scope, Post, $state){
	$scope.pageTitle= 'Create Post';
	$scope.formTitle= 'Form Create Post';
	$scope.model= {};
	$scope.save= function(){
		Post.save($scope.model, function(){
			$state.go('user');	
		});
	};
}]);