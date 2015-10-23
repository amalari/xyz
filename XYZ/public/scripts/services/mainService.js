'use strict';

angular.module('xyz.services')
.factory('CurrentUser', ['$resource', 'ENV', function($resource, ENV){
	return $resource(ENV.apiEndpoint + '/api/current-user/:id', {id:'@id'});
}])