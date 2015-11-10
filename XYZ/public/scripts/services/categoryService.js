'use strict';

angular.module('xyz.services')
.factory('Category', ['$resource', 'ENV', function($resource, ENV){
	return $resource(ENV.apiEndpoint + '/api/category/:id', {id:'@id'}, {
		update:{
			method:"PUT",
		}, 
		query:{
			method:"GET"
		},
		save:{
			method : 'POST',
		}
	});
}])