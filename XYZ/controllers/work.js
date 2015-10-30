var Portfolio = require('./../models/portfolio.js');
var PortfolioViewModel = require('./../viewModels/portfolio.js');

WorkController = {
	registerRoutes : function(app){
		app.get('/portfolio/:id', this.get);
	},
	get : function(req, res){
		Post.single(req.params.id)
		.then(function(model){
			var data = model.toJSON();
			console.log(data);
			console.log("render blog detail");
		})
	}
}

module.exports = WorkController;