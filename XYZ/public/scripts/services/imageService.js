'use strict';

angular.module('xyz.services')
.factory('Image', ['$resource', 'ENV', function($resource, ENV){
	// return $resource(ENV.apiEndpoint + '/list/image/:id', {id:'@id'}, {
	// 	query:{
	// 		method:"GET"
	// 	}
	// });
	 var formDataObject = function (data) {
		var fd = new FormData();
		angular.forEach(data, function(value, key) {
			if(key === '$promise' || key ==='$resolved'){
				return;
			}
			if (value instanceof FileList) {
				if (value.length == 1) {
					fd.append(key, value[0]);
				} else {
					angular.forEach(value, function(file, index) {
						fd.append(key + '_' + index, file);
					});
				}
			} else {
				fd.append(key, value);
			}
		});
		return fd;
	};
	return $resource(ENV.apiEndpoint + '/list/image/:id', {id:'@id'}, {
		update:{
			method:"PUT",
			transformRequest : formDataObject,
			headers : {'Content-Type':undefined, enctype:'multipart/form-data'}
		}, 
		query:{
			method:"GET", isArray:false
		},
		save:{
			method : 'POST',
			transformRequest : formDataObject,
			headers : {'Content-Type':undefined, enctype:'multipart/form-data'}	
		}
	});
}])