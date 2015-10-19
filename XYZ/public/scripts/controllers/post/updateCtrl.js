'use strict';

angular.module('xyz.controllers')
.controller('PostUpdateCtrl', ['$scope', '$state', '$stateParams', 'Post', function($scope, $state, $stateParams, Post){
	$scope.pageTitle= 'Edit Posting';
	$scope.formTitle= 'Form Edit Posting';
	$scope.model= Post.get({id:$stateParams.id});
	$scope.clickSave = function(is_active, type){
		$scope.model.is_active = is_active;
		$scope.model.type = type;
	};
	$scope.save = function(){
		Post.update($scope.model, function(){
			$state.go('post');
		});
	};
}]);