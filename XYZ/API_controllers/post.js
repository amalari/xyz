var Post = require('./../models/post.js');
var qb = require('./../core/queryBuilder/index.js');
var PostViewModel = require('./../viewModels/post.js');

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
		console.log(req.body);
		var data = PostViewModel.save(req.body, req.user.id);
		Post.save(data)
		.then(function(){
			res.send({success: true})
		})
		.catch(function(err){
			console.log(err);
			res.send({success: false, message: err.message})
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
		console.log('back end : update controller');
		var data = PostViewModel.update(req.body);
		console.log(req.body);
		Post.update(data)
		.then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
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