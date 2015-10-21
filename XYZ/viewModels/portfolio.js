var util = require('util');
var viewModels = require('./index.js');

function portfolioViewModel(){
	viewModels.call(this, viewModels);
	this._allProperties = ["title", "architect", "location", "area", "status", "project_year", "content", "is_active", "header_image"];
	this._viewProperties = ["id", "title", "category", "content", "header_image", "created_date", "updated_date", "author"];
	this._viewPropertiesLite = ["id", "title", "architect", "location", "area", "status", "project_year", "content"];
};

util.inherits(portfolioViewModel, viewModels);

portfolioViewModel.prototype.get = function(singleData){
	return this.map(this._viewPropertiesLite, singleData);
};

portfolioViewModel.prototype.save = function(data){
	var post = this.map(this._allProperties, data);
	post.created_date = new Date();
	post.updated_date = post.created_date;
	post.header_image = "adfafadsfdasnfasklfalsfa";
	return post;
};

portfolioViewModel.prototype.update = function(data){
	var post = this.map(this._allProperties, data);
	post.id = data.id;
	post.updated_date = new Date();
	return post;
};

module.exports = new portfolioViewModel();