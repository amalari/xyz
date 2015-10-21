'use strict';

angular.module('xyz.services')
.factory('Portfolio', ['$resource', 'ENV', function($resource, ENV){
	return $resource(ENV.apiEndpoint + '/api/portfolio/:id', {id:'@id'}, {
		update:{
			method:"PUT"
		}, query:{
			method:"GET", isArray:false
		}
	});
}])