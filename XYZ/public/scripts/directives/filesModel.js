angular.module('xyz.directives')
.directive('filesModel',function(){
	return {
		controller: function($parse, $element, $attrs, $scope){
			var exp = $parse($attrs.filesModel);

			$element.on('change', function(){
				exp.assign($scope, this.files);
				$scope.$apply();
			});

			$scope.$watch($attrs.filesModel, function(file){
				if(typeof file === 'undefined' || file === ''){
					$element.closest('form').get(0).reset();
				}
			})
		}
	};
});

