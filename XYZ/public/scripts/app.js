'use strict';

angular.module('xyz',['ui.router','ui.bootstrap','ngAnimate','ngResource','xyz.controllers','xyz.services', 'xyz.config'])
.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	$httpProvider.interceptors.push([
		'$injector',
		function ($injector) {
			return $injector.get('AuthInterceptor');
		}
		]);
	$httpProvider.interceptors.push([
		'$injector',
		function ($injector) {
			return $injector.get('ErrorInterceptor');
		}
		]);
}])
.factory('AuthInterceptor', ['$window', '$q', '$injector', function ($window, $q, $injector) {
	return {
		responseError: function (response) { 
			if(response.status === 401){
				$window.location = '/login';
			}else if(response.status === 403){
				$('.modal').modal('hide');
				$injector.get('$state').transitionTo('forbidden');
			}
			return $q.reject(response);
		}
	};
}])
.factory('ErrorInterceptor', ['$window', '$q', '$injector', '$timeout', function ($window, $q, $injector, $timeout) {
	return {
		responseError: function (response) { 
			if(response.status === 500){
				$('.modal').modal('hide');
				$timeout(function(){$injector.get('$state').transitionTo('error');},500);
			}else if(response.status === 409 || response.status === 400){
       // $('.modal').modal('hide');
       $window.alert(response.data.message);
   }
   return $q.reject(response);
}
};
}])
.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('user',{
		url : '/user',
		templateUrl : 'templates/user/list.html',
		controller : 'UserListCtrl'
	})
	.state('user-create', {
		url: '/user/create',
		templateUrl: 'templates/user/form.html',
		controller: 'UserCreateCtrl'
	})
	.state('user-update', {
		url: '/user/update/:id',
		templateUrl: 'templates/user/form.html',
		controller: 'UserUpdateCtrl'
	});
	// .state('forbidden', {
	// 	url: '/forbidden',
	// 	templateUrl: 'templates/forbidden.html'
	// });

	$urlRouterProvider.otherwise('/user');
}]);
