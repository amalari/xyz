var Post = require('./../models/post.js');
var qb = require('./../core/queryBuilder/index.js');
var PostViewModel = require('./../viewModels/post.js');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');

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
		console.log("controller post")
		app.post('/api/post', this.save);
		app.get('/api/post', this.list);
		app.get('/api/post/:id', this.single);
		app.put('/api/post/:id', this.update);
		app.delete('/api/post/:id', this.delete);
	},
	save : function(req, res){
		console.log("save");
		postMultipart.parseAndSaveFiles(req, function(data){
			data.header_image = postFileManager.getUrl(data.header_image);
			var result = PostViewModel.save(data, req.user.id);
			Post.save(result)
			.then(function(){
				res.send({success: true})
			})
			.catch(function(err){
				console.log(err);
				res.send({success: false, message: err.message})
			})
		})
	},
	list : function(req, res){
		console.log('post list controller');
		console.log(req.query.is_active);
		queryBuilder = new qb();
		queryBuilder.setup({
			limit : req.query.limit,
			page : req.query.page,
			whereCondition : {is_active : req.query.is_active, type : req.query.type}
		});
		console.log(queryBuilder);
		Post.list(queryBuilder)
		.then(function(list){
			res.send(PostViewModel.getList(list));
		})
		.catch(function(err){
			console.log(err);
			res.send({message : err.message})
		})
	},
	single : function(req, res){
		Post.single(req.params.id)
		.then(function(model){
			var data = model.toJSON();
			res.send(PostViewModel.get(data))
		})
	},
	update : function(req, res){
		postMultipart.parseAndSaveFiles(req, function(data){
			Post.single(data.id)
			.then(function(model){
				var posting = model.toJSON();
				if(posting.header_image){
					postFileManager.delete(posting.header_image);
					data.header_image = postFileManager.getUrl(data.header_image);
				}
				var result = PostViewModel.update(data);
				console.log(result);
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
		Post.delete(req.params.id)
		.then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			console.log(err);
			res.send({success : false, message : err.message})
		})
	}
}

module.exports = PostController;