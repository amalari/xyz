var Portfolio = require('./../models/portfolio.js');
var Comment = require('./../models/comment.js');
var PortfolioViewModel = require('./../viewModels/portfolio.js');
var qb = require('./../core/queryBuilder/index.js');

WorkController = {
	registerRoutes : function(app){
		app.get('/portfolio', this.list);
		app.get('/portfolio/:id', this.get);
		app.post('/portfolio/:id', this.save);
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
			var result = PortfolioViewModel.get(data, req.xhr);
			res.render('work', result);
		})
		.catch(function(err){
			res.send(err.message)
		})
	},
	save : function(req, res){
		var result = req.body;
		if(result.parrent_id === ''){
			result.parrent_id = null;
		};
		result.portfolio_id = req.params.id;
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

module.exports = WorkController;