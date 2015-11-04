var Post = require('./../models/post.js');
var Comment = require('./../models/comment.js');
var PostViewModel = require('./../viewModels/post.js');
var qb = require('./../core/queryBuilder/index.js');

BlogController = {
	registerRoutes : function(app){
		app.get('/blog', this.getList);
		app.get('/blog/archive', this.getArchive);
		app.get('/blog/:id', this.get);
		app.post('/blog/:id', this.save);
		app.delete('/blog/:id', this.delete);
	},
	getArchive : function(req, res){
		res.render('archive')
	},
	getList : function(req, res){
		var queryBuilder = new qb();
		queryBuilder.setup({
			limit : 2,
			page : req.query.page,
			whereCondition : {is_active : 1, type : 1}
		});
		Post.list(queryBuilder)
		.then(function(list){
			var data = PostViewModel.getList(list, req.xhr);
			console.log(data);
			res.render('blog', data);
		})
	},
	get : function(req, res){
		Post.single(req.params.id, 1, req.xhr)
		.then(function(model){
			var data = PostViewModel.get(model.toJSON(), req.xhr);
			console.log(data);
			res.render('single', data);
		})
	},
	save : function(req, res){
		var result = req.body;
		if(result.parrent_id === ''){
			result.parrent_id = null;
		};
		result.post_id = req.params.id;
		result.date = new Date();
		Comment.save(result)
		.then(function(){
			res.redirect(req.get('referer'));
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