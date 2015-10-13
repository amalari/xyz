var Post = require('./../models/post.js');
var qb = require('./../core/queryBuilder/index.js');
var PostViewModel = ('./../viewModels/post.js');

PostController = {
	registerRoutes : function(app){
		app.post('/api/post', this.save);
		app.get('/api/post', this.list);
		app.get('/api/post/:id', this.single);
		app.put('/api/post/:id', this.update);
		app.delete('/api/post/:id', this.delete);
	},
	save : function(req, res){
		var data = PostViewModel.save(req.body);
		Post.save(data)
		.then(function(){
			res.send({success: true})
		})
		.catch(function(err){
			res.send({success: false, message: err.message})
		})
	},
	list : function(req, res){
		queryBuilder = new qb();
		queryBuilder.setup({
			limit : req.query.limit,
			page : req.query.page,
			whereCondition : {is_active : true, type : 1}
		});
		Post.list(queryBuilder)
		.then(function(list){
			res.send(PostViewModel.getList(list));
		})
		.catch(function(err){
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
		var data = PostViewModel.update(req.body);
		Post.update(data)
		.then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	},
	delete : function(req, res){
		var data = PostViewModel.delete(req.params.id);
		Post.update(data)
		.then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	}
}

module.exports = PostController;