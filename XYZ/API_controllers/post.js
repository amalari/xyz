var Post = require('./../models/post.js');
var qb = require('./../core/queryBuilder/index.js');
var SearchQb = require('./../core/queryBuilder/search-query-builder.js');
var PostViewModel = require('./../viewModels/post.js');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');
var im = require('imagemagick');

var postMultipart = new Multipart({
	uploadDir : __dirname + '/../public/uploads/posting',
	allowedMimeTypes : ['image/jpeg', 'image/png', 'image/gif' ]
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
		postMultipart.parseAndSaveFiles(req, function(data){
			if(data.header_image != undefined){
				data.header_image = postFileManager.getUrl(data.header_image);
				var deleteExt = data.header_image.split('.');
				deleteExt.splice(deleteExt.length - 1, 1);
				var newFilename = deleteExt.toString() + "_300x300.JPG";
				im.resize({
					srcPath: __dirname + '/../public' + data.header_image,
					dstPath: __dirname + '/../public' + newFilename,
					width:   300,
					height: 300,
					quality: 1,
					format: 'jpg'
				}, function(err, stdout, stderr){
					if (err) throw err;
					console.log('resized to fit within 300x300px');
				});
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
		postMultipart.parseAndSaveFiles(req, function(data){
			Post.single(data.id, req.body.type, req.xhr)
			.then(function(model){
				var posting = model.toJSON();
				if(posting.header_image && data.header_image){
					var deleteExt = posting.header_image.split('.');
					deleteExt.splice(deleteExt.length - 1, 1);
					var newFilename = deleteExt.toString() + "_300x300.JPG";
					postFileManager.delete(posting.header_image);
					postFileManager.delete(newFilename);
					data.header_image = postFileManager.getUrl(data.header_image);
					var deleteExtNew = data.header_image.split('.');
					deleteExtNew.splice(deleteExtNew.length - 1, 1);
					var newFilenameWillSave = deleteExtNew.toString() + "_300x300.JPG";
					im.resize({
						srcPath: __dirname + '/../public' + data.header_image,
						dstPath: __dirname + '/../public' + newFilenameWillSave,
						width:   300,
						height: 300,
						quality: 1,
						format: 'jpg'
					}, function(err, stdout, stderr){
						if (err) throw err;
						console.log('resized to fit within 300x300px');
					});
				} else {
					data.header_image = posting.header_image;
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
			var deleteExt = posting.header_image.split('.');
			deleteExt.splice(deleteExt.length - 1, 1);
			var newFilename = deleteExt.toString() + "_300x300.JPG";
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