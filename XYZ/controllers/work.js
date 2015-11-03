var Portfolio = require('./../models/portfolio.js');
var PortfolioViewModel = require('./../viewModels/portfolio.js');
var qb = require('./../core/queryBuilder/index.js');

WorkController = {
	registerRoutes : function(app){
		app.get('/portfolio', this.list);
		app.get('/portfolio/:id', this.get);
		app.post('/portfolio', this.save);
		app.delete('/portfolio/:id', this.delete);
	},
	list : function(req, res){
		var queryBuilder = new qb();
		queryBuilder.setup({
			limit : 9,
			page : req.query.page,
			whereCondition : {is_active : 1}
		});
		Portfolio.list(queryBuilder)
		.then(function(list){
			var result = {};
			result.data = PortfolioViewModel.list(list.data);
			result.total = list.total;
			console.log(result);
			res.render('homepage', result);
		})
		.catch(function(err){
			res.send(err.message)
		})
	},
	get : function(req, res){
		Portfolio.single(req.params.id)
		.then(function(model){
			var data = model.toJSON();
			console.log(data);
			console.log("render blog detail");
			res.render('work');
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