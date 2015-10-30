var util = require('util');
var viewModels = require('./index.js');

function projectViewModel(){
	viewModels.call(this, viewModels);
	this._allProperties = ["site_area", "width", "length", "site_address", "coordinate", "google_earth_file", "design_reference_file", "content", "client_id"];
	this._viewProperties = ["id", "title", "category", "created_date", "updated_date", "author"];
	this._viewPropertiesLite = ["id", "created_date", "clientName", "clientEmail"];
};

util.inherits(projectViewModel, viewModels);

projectViewModel.prototype.getList = function(listData){
	var that = this;
	listData = listData.map(function(data){
		data.clientName = data.client.name;
		data.clientEmail = data.client.email;
		return that.map(that._viewPropertiesLite, data)
	});
	return listData;
}

projectViewModel.prototype.save = function(data){
	console.log("form view model");
	var multiple = {};
	var result = {};
	for(var key in data){
		if(this._allProperties.indexOf(key) === -1){
			multiple[key] = data[key];
		}
	};
	var post = this.map(this._allProperties, data);
	console.log(post);
	for(var i in post){
		for(var x in multiple){
			if(x.indexOf(i) > -1){
				result[i] = post[i] + "," + multiple[x];
			} else {
				result[i] = post[i];
			}
		}
	};
	result.created_date = new Date();
	return result;
};

// postViewModel.prototype.get = function(data){
// 	return this.map(this._viewPropertiesLite, data);
// };

// postViewModel.prototype.update = function(data){
// 	if(data.category_id || data.header_image){
// 		data.category_id = parseInt(data.category_id);
// 	} else {
// 		data.category_id = null;
// 		data.header_image = null;
// 	};
// 	var post = this.map(this._allProperties, data);
// 	post.id = data.id;
// 	post.updated_date = new Date();
// 	return post;
// };

module.exports = new projectViewModel();