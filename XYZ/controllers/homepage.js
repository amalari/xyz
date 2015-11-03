var Portfolio = require('./../models/portfolio.js');
var PortfolioViewModel = require('./../viewModels/portfolio.js');
var qb = require('./../core/queryBuilder/index.js');

HomepageController = {
	registerRoutes : function(app){
		app.get('/', this.list);
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
	}
}

module.exports = HomepageController;