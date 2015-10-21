'use strict';

angular.module('xyz.services')
.factory('ProjectRequest', ['$resource', 'ENV', function($resource, ENV){
	return $resource(ENV.apiEndpoint + '/api/project-request/:id', {id:'@id'}, {
		query:{
			method:"GET", isArray:false
		}
	});
}])