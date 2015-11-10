//var Post = require('./../models/post.js');

ContactController = {
	registerRoutes : function(app){
		app.get('/contact', this.get);
	},
	get : function(req, res){
		console.log('sini');
		var result = {};
		res.render("contact", result);
		/*Post.single(null, 2, req.xhr)
		.then(function(data){
			var result = data.toJSON();
			res.render("contact", result);
		})*/
	}
}

module.exports = ContactController;