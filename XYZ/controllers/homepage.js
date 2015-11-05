var Portfolio = require('./../models/portfolio.js');
var PortfolioViewModel = require('./../viewModels/portfolio.js');
var qb = require('./../core/queryBuilder/index.js');

HomepageController = {
	registerRoutes : function(app){
		app.get('/', this.list);
	},
	list : function(req, res){
		var currentPage = 1;
		if(req.query.page){
			currentPage = req.query.page
		};
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
			result.pagination = 
			{ 
				page:currentPage, limit:9, totalRows: 7
			};
			res.render('homepage', result);
		})
		.catch(function(err){
			res.send(err.message)
		})
	}
}

module.exports = HomepageController;