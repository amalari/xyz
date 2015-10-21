var Portfolio = require('./../models/portfolio.js');
var qb = require('./../core/queryBuilder/index.js');
var PortfolioViewModel = require('./../viewModels/portfolio.js');

PortfolioController = {
	registerRoutes : function(app){
		console.log("controller portfolio")
		app.get('/api/portfolio', this.list);
		app.get('/api/portfolio/:id', this.single);
		app.post('/api/portfolio', this.save);
		app.put('/api/portfolio/:id', this.update);
		app.delete('/api/portfolio/:id', this.delete);
	},
	list : function(req, res){
		queryBuilder = new qb();
		queryBuilder.setup({
			limit : req.query.limit,
			page : req.query.page,
			whereCondition : {is_active : req.query.is_active}
		});
		Portfolio.list(queryBuilder)
		.then(function(list){
			res.send(list);
		})
		.catch(function(err){
			res.send(err.message)
		})
	},
	single : function(req, res){
		Portfolio.single(req.params.id)
		.then(function(model){
			var data = model.toJSON();
			res.send(PortfolioViewModel.get(data))
		})
	},
	save : function(req, res){
		var data = PortfolioViewModel.save(req.body);
		Portfolio.save(data)
		.then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	},
	update : function(req, res){
		var data = PortfolioViewModel.save(req.body);
		Portfolio.update(data)
		.then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	},
	delete : function(req, res){
		Portfolio.delete(req.params.id)
		.then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	}
}

module.exports = PortfolioController;