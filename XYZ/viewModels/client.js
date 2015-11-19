var util = require('util');
var viewModels = require('./index.js');
var randtoken = require('rand-token');

function clientViewModel(){
	viewModels.call(this, viewModels);
	this._allProperties = ["name", "email", "birth", "gender", "nationality", "verify"];
	this._viewProperties = ["id", "title", "category", "created_date", "updated_date", "author"];
	this._viewPropertiesLite = ["id", "title", "category", "content", "header_image"];
};

util.inherits(clientViewModel, viewModels);

clientViewModel.prototype.save = function(data){
	var that = this;
	var birthday = new Date();
	birthday.setFullYear(parseInt(data.year), parseInt(data.month)-1, parseInt(data.date));
	data.birth = birthday;
	data.verify = that.generateToken();
	return this.map(this._allProperties, data);
};

clientViewModel.prototype.generateToken = function(){
	return randtoken.generate(20);
};

module.exports = new clientViewModel();