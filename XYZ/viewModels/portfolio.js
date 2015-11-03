var util = require('util');
var viewModels = require('./index.js');

function portfolioViewModel(){
	viewModels.call(this, viewModels);
	this._allProperties = ["title", "architect", "location", "area", "status", "project_year", "content", "is_active", "header_image"];
	this._viewPropertiesLite = ["id", "title", "header_image", "status"];
	this._viewProperties = ["id", "title", "architect", "location", "area", "status", "project_year", "content", "header_image", "portfolioImage"];
	this._
};

util.inherits(portfolioViewModel, viewModels);

portfolioViewModel.prototype.get = function(singleData){
	return this.map(this._viewProperties, singleData);
};

portfolioViewModel.prototype.list = function(listData){
	var that = this;
	listData = listData.map(function(data){
		return that.map(that._viewPropertiesLite, data)
	});
	return listData;
};

portfolioViewModel.prototype.save = function(data){
	var post = this.map(this._allProperties, data);
	post.created_date = new Date();
	post.updated_date = post.created_date;
	return post;
};

portfolioViewModel.prototype.update = function(data){
	var post = this.map(this._allProperties, data);
	post.id = data.id;
	post.updated_date = new Date();
	return post;
};

module.exports = new portfolioViewModel();