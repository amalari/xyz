'use strict';

angular.module('xyz',['ui.router','ui.bootstrap','ngAnimate','ngResource','xyz.controllers','xyz.services', 'xyz.directives', 'xyz.config', 'ui.tinymce'])
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
		templateUrl: 'templates/user/update-form.html',
		controller: 'UserUpdateCtrl'
	})
	.state('user-profile', {
		url: '/user/profile/:id',
		templateUrl: 'templates/user/profile.html',
		controller: 'UserProfileCtrl'
	})
	.state('post-create', {
		url: '/post/create',
		templateUrl: 'templates/post/form.html',
		controller: 'PostCreateCtrl'
	})
	.state('post', {
		url: '/post',
		templateUrl: 'templates/post/list.html',
		controller: 'PostListCtrl'
	})
	.state('post-update', {
		url: '/post/update/:id',
		templateUrl: 'templates/post/form.html',
		controller: 'PostUpdateCtrl'
	})
	.state('page', {
		url:'/page',
		templateUrl: 'templates/page/list.html',
		controller: 'PageListCtrl'
	})
	.state('page-create', {
		url: '/page/create',
		templateUrl: 'templates/page/form.html',
		controller: 'PageCreateCtrl'
	})
	.state('page-update', {
		url: '/page/update/:id',
		templateUrl: 'templates/page/form.html',
		controller: 'PageUpdateCtrl'
	})
	.state('portfolio', {
		url: '/portfolio',
		templateUrl: 'templates/portfolio/list.html',
		controller: 'PortfolioListCtrl'
	})
	.state('portfolio-create', {
		url: '/portfolio/create',
		templateUrl: 'templates/portfolio/form.html',
		controller: 'PortfolioCreateCtrl'
	})
	.state('portfolio-update', {
		url: '/portfolio/update/:id',
		templateUrl: 'templates/portfolio/form.html',
		controller: 'PortfolioUpdateCtrl'
	})
	.state('project-request', {
		url: '/project-request',
		templateUrl: 'templates/project-request/list.html',
		controller: 'ProjectRequestListCtrl'
	})
	.state('projectRequest-detail', {
		url: '/project-request/detail/:id',
		templateUrl: 'templates/project-request/detail.html',
		controller: 'ProjectRequestDetailCtrl'
	});
	// .state('forbidden', {
	// 	url: '/forbidden',
	// 	templateUrl: 'templates/forbidden.html'
	// });

	$urlRouterProvider.otherwise('/user');
}]);
