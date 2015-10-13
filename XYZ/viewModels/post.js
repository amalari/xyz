var util = require('util');
var viewModel = require('./../index.js');

function postViewModel(){
	this._allProperties = ["type", "title", "category_id", "content", "header_image", "created_date", "user_id", "is_active"];
	this._viewProperties = ["id", "title", "category", "content", "header_image", "created_date", "author"];
	// this._allProperties = ["id","type", "title", "category_id", "content", "header_image", "created_date", "user_id", "is_active"];
};

util.inherits(postViewModel, viewModel);

postViewModel.prototype.getList = function(listData){
	var result = {};
	result.data = listData.map(function(data){
		return this.map(this._viewProperties, data)
	}
	result.total = listData.total;
	return result;
}

postViewModel.prototype.save = function(data){
	var post = this.map(this._allProperties, data);
	post.created_date = new Date();
	post.updated_date = post.created_date;
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

postViewModel.prototype.delete = function(id){
	var post = {};
	post.id = id;
	post.is_active = 0;
};

module.exports = new postViewModel();