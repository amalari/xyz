var Post = require('./../models/post.js');
var PostViewModel = require('./../viewModels/post.js');
var qb = require('./../core/queryBuilder/index.js');

BlogController = {
	registerRoutes : function(app){
		app.get('/blog', this.getList);
		app.get('/blog/:id', this.get);
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
		})
	},
	get : function(req, res){
		Post.single(req.params.id, 1, req.xhr)
		.then(function(model){
			var data = model.toJSON();
			console.log(data);
			console.log("render blog detail");
		})
	}
}

module.exports = BlogController;