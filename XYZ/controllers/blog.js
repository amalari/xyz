var Post = require('./../models/post.js');
var Comment = require('./../models/comment.js');
var PostViewModel = require('./../viewModels/post.js');
var qb = require('./../core/queryBuilder/index.js');

BlogController = {
	registerRoutes : function(app){
		app.get('/blog', this.getList);
		app.get('/blog/archive', this.getArchive);
		app.get('/blog/:id', this.get);
		app.post('/blog', this.save);
		app.delete('/blog/:id', this.delete);
	},
	getArchive : function(req, res){
		res.render('archive')
	},
	getList : function(req, res){
		var queryBuilder = new qb();
		queryBuilder.setup({
			limit : req.query.limit,
			page : req.query.page,
			whereCondition : {is_active : 1, type : 1}
		});
		Post.list(queryBuilder)
		.then(function(list){
			var data = PostViewModel.getList(list, req.xhr);
			console.log(data);
			console.log("render page blog list")
			res.render('blog');
		})
	},
	get : function(req, res){
		Post.single(req.params.id, 1, req.xhr)
		.then(function(model){
			var data = model.toJSON();
			console.log(data);
			console.log("render blog detail");
			res.render('single');
		})
	},
	save : function(req, res){
		Comment.save(req.body)
		.then(function(){
			console.log("reload page")
		})
		.catch(function(err){
			console.log(err.message);
		})
	},
	delete : function(req, res){
		Comment.get(req.params.id)
		.then(function(model){
			var data = model.toJSON();
			data.is_active = 0;
			return Comment.delete(data)
		})
		.then(function(){
			console.log("comment ini telah dihapus")
		})
		.catch(function(err){
			console.log(err.message);
		})
	}
}

module.exports = BlogController;