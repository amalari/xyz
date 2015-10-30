var Portfolio = require('./../models/portfolio.js');
var PortfolioViewModel = require('./../viewModels/portfolio.js');

WorkController = {
	registerRoutes : function(app){
		app.get('/portfolio/:id', this.get);
		app.post('/portfolio', this.save);
		app.delete('/portfolio/:id', this.delete);
	},
	get : function(req, res){
		Post.single(req.params.id)
		.then(function(model){
			var data = model.toJSON();
			console.log(data);
			console.log("render blog detail");
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

module.exports = WorkController;