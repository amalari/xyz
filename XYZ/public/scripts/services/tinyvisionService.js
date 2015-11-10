'use strict';

angular.module('xyz.services')
.factory('TinyVision', ['$resource', 'ENV', function($resource, ENV){
	return $resource(ENV.apiEndpoint + '/list/image/:id', {id:'@id'}, {
		query:{
			method:"GET"
		}
	});
}])