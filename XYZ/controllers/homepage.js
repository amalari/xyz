var Portfolio = require('./../models/portfolio.js');
var PortfolioViewModel = require('./../viewModels/portfolio.js');
var Post = require('./../models/post.js');
var PostViewModel = require('./../viewModels/post.js');
var SearchQb = require('./../core/queryBuilder/search-query-builder.js');
var qb = require('./../core/queryBuilder/index.js');

HomepageController = {
	registerRoutes : function(app){
		app.get('/', this.list);
		app.get('/search', this.search);
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
				page:currentPage, limit:9, totalRows: result.total
			};
			res.render('homepage', {
				layout: "_homepage",
				data : result});
		})
		.catch(function(err){
			res.send(err.message)
		})
	},
	search : function(req, res){
		var result = {};
		var currentPage = 1;
		if(req.query.page){
			currentPage = req.query.page
		};
		var queryBuilder = new SearchQb();
		queryBuilder.setup({
			limit : 10,
			page : req.query.page,
			whereCondition : {is_active : 1, type : 1}
		});
		queryBuilder.search(['title', 'LIKE', '%' + req.query.q + '%']);
		queryBuilder.search(['content', 'LIKE', '%' + req.query.q + '%']);
		Post.list(queryBuilder)
		.then(function(data){
			result.blog = PostViewModel.getList(data, req.xhr, req.path);
			queryBuilder.setup({
				limit : 10,
				page : req.query.page,
				whereCondition : {is_active : 1}
			});
			queryBuilder.search(['title', 'LIKE', '%' + req.query.q + '%']);
			queryBuilder.search(['content', 'LIKE', '%' + req.query.q + '%']);
			return Portfolio.list(queryBuilder)
		})
		.then(function(data2){
			result.portfolio = {};
			result.portfolio.data = PortfolioViewModel.list(data2.data);
			result.portfolio.total = data2.total;
			result.pagination = 
			{ 
				page:currentPage, limit:10, totalRows: result.blog.total
			};
			result.pagination1 = 
			{ 
				page:currentPage, limit:10, totalRows: result.portfolio.total
			};
			result.q = req.query.q;
			res.render('archive', result);
		})
	}
}

module.exports = HomepageController;