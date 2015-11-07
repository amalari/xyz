var util = require('util');
var viewModels = require('./index.js');
var gravatar= require('gravatar');

function portfolioViewModel(){
	viewModels.call(this, viewModels);
	this._allProperties = ["title", "architect", "location", "area", "status", "project_year", "content", "is_active", "header_image", "category_id"];
	this._viewPropertiesLite = ["id", "title", "header_image", "status"];
	this._viewPropertiesList = ["id", "title", "category", "created_date","header_image", "content", "updated_date", "author", "totalComment", "architect", "visitor"];
	this._viewProperties = ["id", "title", "architect", "location", "area", "status", "project_year", "content", "header_image", "portfolioImages"];
	this._viewPropertiesVisitor = ["id", "architect", "status", "totalComment", "area", "location", "title", "content", "project_year", "rootComments", "header_image", "portfolioImage", "category", "visitor"];
};

util.inherits(portfolioViewModel, viewModels);

portfolioViewModel.prototype.get = function(data, ajaxRequest){
	if(ajaxRequest){
		return this.map(this._viewProperties, data);
	} else {
		var arr = [];
		data.rootComments = [];
		for(var i in data.comments){
			if(data.comments[i].is_active == 1){
				arr.push(data.comments[i]);
			}
		};
		for(var a in data.comments){
			if(data.comments[a].parrent_id === null){
				data.rootComments.push(data.comments[a]);
			} else {
				for(var b in data.rootComments){
					if(data.comments[a].parrent_id === data.rootComments[b].id){
						data.rootComments[b].comments =[];
						data.rootComments[b].comments.push(data.comments[a]);
					}
				}
			}
		}
		data.totalComment = arr.length;
		data.comments = data.comments.map(function(obj){
			obj.avatar = gravatar.url(obj.email, {s: '100', r: 'G', d: 'retro'});
			return obj
		});
	};
	return this.map(this._viewPropertiesVisitor, data);
};

portfolioViewModel.prototype.list = function(listData){
	var that = this;
	listData = listData.map(function(data){
		var arr = [];
		for(var i in data.comments){
			if(data.comments[i].is_active == 1){
				arr.push(data.comments[i]);
			}
		};
		data.comments = arr;
		data.totalComment = arr.length;
		return that.map(that._viewPropertiesList, data)
	});
	return listData;
};

portfolioViewModel.prototype.save = function(data){
	var post = this.map(this._allProperties, data);
	post.category_id = parseInt(post.category_id);
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