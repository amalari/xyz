'use strict';

angular.module('xyz.controllers')
.controller('PostCreateCtrl', ['$scope', 'Post', '$state', function($scope, Post, $state){
	$scope.pageTitle= 'Create Post';
	$scope.formTitle= 'Form Create Post';
	$scope.model= {};
	$scope.clickSave = function(is_active, type){
		$scope.model.is_active = is_active;
		$scope.model.type = type;
	};
	$scope.save= function(){
		console.log($scope.model);
		Post.save($scope.model, function(){
			$state.go('post');	
		});
	};

	$scope.tinymceOptions = {
		onChange: function(e) {
			alert('as');
      // put logic here for keypress and cut/paste changes
  },
  inline: false,
  plugins: [
  "advlist autolink lists link image charmap print preview anchor",
  "searchreplace visualblocks code fullscreen",
  "insertdatetime media table contextmenu paste"
  ],
  toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
};

}]);