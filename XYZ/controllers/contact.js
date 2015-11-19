//var Post = require('./../models/post.js');

ContactController = {
	registerRoutes : function(app){
		app.get('/contact', this.get);
	},
	get : function(req, res){
		var result = {};
		res.render("contact", result);
	}
}

module.exports = ContactController;