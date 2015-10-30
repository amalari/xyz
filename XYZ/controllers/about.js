var Post = require('./../models/post.js');

AboutController = {
	registerRoutes : function(app){
		app.get('/about', this.get);
	},
	get : function(req, res){
		Post.single(null, 2, req.xhr)
		.then(function(data){
			console.log(data.toJSON());
			console.log("render page about")
		})
	}
}

module.exports = AboutController;