'use strict';

angular.module('xyz.services')
.factory('User', ['$resource', 'ENV', function($resource, ENV){
	return $resource(ENV.apiEndpoint + '/api/user/:id', {id:'@id'}, {
		update:{
			method:"PUT"
		}
	});
}])