var util = require('util');
var viewModels = require('./index.js');

function postViewModel(){
	viewModels.call(this, viewModels);
	this._allProperties = ["title", "type", "category_id", "content", "header_image", "is_active"];
	this._viewProperties = ["id", "title", "category", "content", "header_image", "created_date", "updated_date", "author"];
};

util.inherits(postViewModel, viewModels);

postViewModel.prototype.getList = function(listData){
	console.log("post view model get list");
	var that = this;
	var result = {};
	result.data = listData.data.map(function(data){
		data.author = data.user.fullname;
		return that.map(that._viewProperties, data)
	});
	result.total = listData.total;
	return result;
}

postViewModel.prototype.save = function(data, userId){
	console.log("post view model");
	console.log(data);
	if(data.category_id){
		data.category_id = parseInt(data.category_id);
	} else {
		data.category_id = null;
	};
	var post = this.map(this._allProperties, data);
	post.created_date = new Date();
	post.updated_date = post.created_date;
	post.user_id = userId;
	post.header_image = "asdfasfasfsafsafas";
	console.log(post);
	return post
};

postViewModel.prototype.get = function(data){
	return this.map(this._viewProperties, data);
};

postViewModel.prototype.update = function(data){
	var post = this.map(this._allProperties, data);
	post.id = data.id;
	post.updated_date = new Date();
	return post;
};

module.exports = new postViewModel();