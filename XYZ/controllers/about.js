var Post = require('./../models/post.js');

AboutController = {
	registerRoutes : function(app){
		app.get('/about', this.get);
	},
	get : function(req, res){
		Post.single(null, 2, req.xhr)
		.then(function(data){
			var result = data.toJSON();
			res.render("about", result);
		})
	}
}

module.exports = AboutController;