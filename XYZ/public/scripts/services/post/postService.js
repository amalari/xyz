'use strict';

angular.module('xyz.services')
.factory('Post', ['$resource', 'ENV', function($resource, ENV){
	return $resource(ENV.apiEndpoint + '/api/post/:id', {id:'@id'}, {
		update:{
			method:"PUT"
		}
	});
}])