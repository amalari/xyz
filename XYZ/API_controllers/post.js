var Post = require('./../models/post.js');
var qb = require('./../core/queryBuilder/index.js');
var SearchQb = require('./../core/queryBuilder/search-query-builder.js');
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
		console.log("controller post");
		app.post('/api/post', this.save);
		app.get('/api/post', this.list);
		app.get('/api/post/:id', this.single);
		app.put('/api/post/:id', this.update);
		app.delete('/api/post/:id', this.delete);
	},
	save : function(req, res){
		console.log("save");
		postMultipart.parseAndSaveFiles(req, function(data){
			if(data.header_image){
				data.header_image = postFileManager.getUrl(data.header_image);
<<<<<<< HEAD
			};
=======
			}
>>>>>>> e2cfb7de9c40a04fe1319b5b29ca11d27ce94cb2
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
		var queryBuilder = new SearchQb();
		queryBuilder.setup({
			limit : req.query.limit,
			page : req.query.page,
			whereCondition : {is_active : req.query.is_active, type: req.query.type}
		});
		if(req.query.type == 2){
			console.log("lewat sini dulu harusnya");
			queryBuilder.search([{is_active: req.query.is_active, type: '2'}]);
			queryBuilder.search([{is_active: req.query.is_active, type: '3'}]);
		};
		Post.list(queryBuilder)
		.then(function(list){
			res.send(PostViewModel.getList(list, req.xhr));
		})
		.catch(function(err){
			console.log(err);
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
			console.log("ini bukan untuk type about dan contact");
		};
		postMultipart.parseAndSaveFiles(req, function(data){
<<<<<<< HEAD
			Post.single(data.id, req.body.type, req.xhr)
			.then(function(model){
				var posting = model.toJSON();
				if(posting.header_image){
=======
			console.log('data ---------------------------');
			console.log(data);
			Post.single(data.id, 1, req.xhr)
			.then(function(model){
				var posting = model.toJSON();
				console.log("=----------------------------====");
				console.log(posting);
				console.log(posting.header_image);
				console.log(data.header_image);
				if(posting.header_image && data.header_image){
>>>>>>> e2cfb7de9c40a04fe1319b5b29ca11d27ce94cb2
					postFileManager.delete(posting.header_image);
					data.header_image = postFileManager.getUrl(data.header_image);
				}
				else if(posting.header_image && !data.header_image){
					data.header_image = posting.header_image;
				}else{
					data.header_image = '';
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
		Post.single(req.params.id, 1, req.xhr)
		.then(function(model){
			var posting = model.toJSON();
			console.log(posting);
			if(posting.header_image != null){
				console.log("destroynya lewat sini ga?")
				postFileManager.delete(posting.header_image);
			};
			return Post.delete(req.params.id) 
		})
		.then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			console.log(err);
			res.send({success : false, message : err.message})
		})
	}
};

module.exports = PostController;