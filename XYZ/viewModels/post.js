var util = require('util');
var viewModels = require('./index.js');
var gravatar= require('gravatar');
var sanitizeHtml = require('sanitize-html');

function postViewModel(){
	viewModels.call(this, viewModels);
	this._allProperties = ["title", "type", "category_id", "content", "header_image", "is_active"];
	this._viewProperties = ["id", "title", "category", "created_date","header_image", "content", "updated_date", "author", "authorId" , "totalComment", "visitor", "liker", "typeName"];
	this._viewPropertiesVisitor = ["id", "header_image", "category", "totalComment", "author", "content", "rootComments", "title", "visitor", "liker"];
	this._viewPropertiesLite = ["id", "title", "category", "content", "header_image", "category_id", "type"];
};

util.inherits(postViewModel, viewModels);

postViewModel.prototype.getList = function(listData, ajaxRequest, fromUrl){
	var that = this;
	var result = {};
	if(ajaxRequest){
		result.data = listData.data.map(function(data){
			if(data.type == 2){
				data.typeName = "about";
			} else {
				if(data.type == 3){
					data.typeName = "contact"
				}
			};
			delete data.header_image;
			delete content;
			data.author = data.user.fullname;
			return that.map(that._viewProperties, data)
		});
	} else {
		result.data = listData.data.map(function(data){
			var arr = [];
			for(var i in data.comments){
				if(data.comments[i].is_active == 1){
					arr.push(data.comments[i]);
				}
			};
			data.comments = arr;
			data.totalComment = arr.length;
			data.content = that.summary(data.content, '16px');
			data.author = data.user.fullname;
			data.authorId = data.user.id;
			if(fromUrl == '/search' && data.header_image != null){
				var deleteExt = data.header_image.split('.');
				deleteExt.splice(deleteExt.length - 1, 1);
				var newFilename = deleteExt.toString() + "_300x300.JPG";
				data.header_image = newFilename;
			};
			return that.map(that._viewProperties, data)
		});
	}
	result.total = listData.total;
	return result;
};

postViewModel.prototype.save = function(data, userId){
	if(data.category_id){
		data.category_id = parseInt(data.category_id);
	} else {
		data.category_id = null;
	};
	var post = this.map(this._allProperties, data);
	post.created_date = new Date();
	post.updated_date = post.created_date;
	post.user_id = userId;
	return post
};

postViewModel.prototype.get = function(data, ajaxRequest){
	if(ajaxRequest){
		return this.map(this._viewPropertiesLite, data);
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
						if(data.rootComments[b].comments == undefined){
							data.rootComments[b].comments =[];
						};
						data.rootComments[b].comments.push(data.comments[a]);
					}
				}
			}
		};
		data.totalComment = arr.length;
		data.author = data.user.fullname;
		data.comments = data.comments.map(function(obj){
			obj.avatar = gravatar.url(obj.email, {s: '100', r: 'G', d: 'retro'});
			return obj
		});
	};
	return this.map(this._viewPropertiesVisitor, data);
};

postViewModel.prototype.update = function(data){
	if(data.category_id != 'null' || data.header_image != 'null'){
		data.category_id = parseInt(data.category_id);
	} else {
		data.category_id = null;
		data.header_image = null;
	};
	var post = this.map(this._allProperties, data);
	post.id = data.id;
	post.updated_date = new Date();
	return post;
};

postViewModel.prototype.summary = function(content, size){
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

module.exports = new postViewModel();