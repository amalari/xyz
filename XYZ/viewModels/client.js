var util = require('util');
var viewModels = require('./index.js');
var Hashids = require('hashids');

function clientViewModel(){
	viewModels.call(this, viewModels);
	this._allProperties = ["name", "email", "birth", "gender", "nationality", "image_id_card"];
	this._viewProperties = ["id", "title", "category", "created_date", "updated_date", "author"];
	this._viewPropertiesLite = ["id", "title", "category", "content", "header_image"];
};

util.inherits(clientViewModel, viewModels);

// postViewModel.prototype.getList = function(listData){
// 	console.log("post view model get list");
// 	var that = this;
// 	var result = {};
// 	result.data = listData.data.map(function(data){
// 		data.author = data.user.fullname;
// 		return that.map(that._viewProperties, data)
// 	});
// 	result.total = listData.total;
// 	return result;
// }

postViewModel.prototype.save = function(data, userId){
	console.log("form view model");
	return this.map(this._allProperties, data);
};

postViewModel.prototype.hash = function(data){
	var hashids = new Hashids(data.name);
	data.verify = hashids.encode(data.id);
	return data;
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

module.exports = new clientViewModel();