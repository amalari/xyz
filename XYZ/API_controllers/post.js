var Post = require('./../models/post.js');
var qb = require('./../core/queryBuilder/index.js');
var SearchQb = require('./../core/queryBuilder/search-query-builder.js');
var PostViewModel = require('./../viewModels/post.js');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');
var im = require('imagemagick');

var postMultipart = new Multipart({
	uploadDir : __dirname + '/../public/uploads/posting',
	allowedMimeTypes : ['image/jpeg', 'image/png', 'image/gif', 'image/jpg' ]
});

var postFileManager = new FileManager({
	dir : __dirname + '/../public/uploads/posting',
	baseUrl : '/uploads/posting'
});

PostController = {
	registerRoutes : function(app){
		app.post('/api/post', this.save);
		app.get('/api/post', this.list);
		app.get('/api/post/:id', this.single);
		app.put('/api/post/:id', this.update);
		app.delete('/api/post/:id', this.delete);
	},
	save : function(req, res){
		var thumbnails = {
			synchronous : false,
			fieldname : "header_image",
			height : 300,
			width : 300,
			quality : 1
		};
		postMultipart.parseAndSaveFiles(req, function(data){
			if(data.header_image != undefined || data.header_image != null){
				postMultipart.createImageResizer(data, thumbnails, function(){});
				data.header_image = postFileManager.getUrl(data.header_image);
			};
			var result = PostViewModel.save(data, req.user.id);
			Post.save(result)
			.then(function(){
				res.send({success: true})
			})
			.catch(function(err){
				res.send({success: false, message: err.message})
			})
		})
	},
	list : function(req, res){
		var queryBuilder = new SearchQb();
		queryBuilder.setup({
			limit : req.query.limit,
			page : req.query.page,
			orderBy : "DESC",
			whereCondition : {is_active : req.query.is_active, type: req.query.type}
		});
		if(req.query.type == 2){
			queryBuilder.search([{is_active: req.query.is_active, type: '2'}]);
			queryBuilder.search([{is_active: req.query.is_active, type: '3'}]);
		};
		Post.list(queryBuilder)
		.then(function(list){
			res.send(PostViewModel.getList(list, req.xhr));
		})
		.catch(function(err){
			res.send({message : err.message})
		})
	},
	single : function(req, res){
		Post.single(req.params.id, null, req.xhr)
		.then(function(model){
			var data = model.toJSON();
			res.send(PostViewModel.get(data, req.xhr))
		})
	},
	update : function(req, res){
		if(req.body.type != 2 || req.body.type != 3){
		};
		var thumbnails = {
			synchronous : false,
			fieldname : "header_image",
			height : 300,
			width : 300,
			quality : 1
		};
		postMultipart.parseAndSaveFiles(req, function(data){
			Post.single(data.id, req.body.type, req.xhr)
			.then(function(model){
				var posting = model.toJSON();
				if(posting.header_image != null){
					if(data.header_image != null || data.header_image != undefined){
						var newFilename = postFileManager.addCharBeforeExt(posting.header_image, "300x300");
						postFileManager.delete(posting.header_image);
						postFileManager.delete(newFilename);
						postMultipart.createImageResizer(data, thumbnails, function(){});
						data.header_image = postFileManager.getUrl(data.header_image);
					} else {
					data.header_image = posting.header_image;
				}
			};
			var result = PostViewModel.update(data);
			return Post.update(result);
		})
			.then(function(){
				res.send({success : true})
			})
			.catch(function(err){
				res.send({success : false, message : err.message})
			})
		})
	},
	delete : function(req, res){
		Post.single(req.params.id, 1, req.xhr)
		.then(function(model){
			var posting = model.toJSON();
			if(posting.header_image != null){
				var newFilename = postFileManager.addCharBeforeExt(posting.header_image, "300x300");
				postFileManager.delete(posting.header_image);
				postFileManager.delete(newFilename);
			};
			return Post.delete(req.params.id) 
		})
		.then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	}
};

module.exports = PostController;