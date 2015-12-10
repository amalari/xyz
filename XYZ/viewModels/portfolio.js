var util = require('util');
var viewModels = require('./index.js');
var gravatar= require('gravatar');
var sanitizeHtml = require('sanitize-html');

function portfolioViewModel(){
	viewModels.call(this, viewModels);
	this._allProperties = ["title", "architect", "location", "area", "status", "project_year", "content", "is_active", "header_image", "category_id"];
	this._viewPropertiesLite = ["id", "title", "header_image", "status"];
	this._viewPropertiesList = ["id", "title", "category", "area" , "created_date","header_image", "content", "updated_date", "author", "totalComment", "architect", "visitor", "liker"];
	this._viewProperties = ["id", "title", "architect", "location", "area", "status", "project_year", "content", "header_image", "portfolioImages", "category_id"];
	this._viewPropertiesVisitor = ["id", "architect", "status", "totalComment", "area", "location", "title", "content", "project_year", "rootComments", "header_image", "portfolioImages", "category", "visitor", "liker"];
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
		var newHeader = data.header_image.split(".");
		var ext = newHeader.splice(newHeader.length-1, 1);
		for(var a in newHeader){
			if(a > 0){
				name_image = name_image + "." + newHeader[a];
			} else {
				var name_image = newHeader[a]
			}
		};
		data.header_image = name_image + "_400x400." + ext;
		var arr = [];
		for(var i in data.comments){
			if(data.comments[i].is_active == 1){
				arr.push(data.comments[i]);
			}
		};
		data.comments = arr;
		data.totalComment = arr.length;
		data.content = that.summary(data.content, '16px');
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
portfolioViewModel.prototype.summary = function(content, size){
	var content = sanitizeHtml(content, {
		allowedTags : ['p']
	});
	var newContent="";
	if(content.length > 300){
		newContent = content.substr(0, 300) + " . . . .</p>";
	} else {
		var lastIndex = content.lastIndexOf("</p>");
		newContent = content.substr(0, lastIndex);
		newContent = newContent + " . . . .</p>"
	};
	return newContent;
};

module.exports = new portfolioViewModel();