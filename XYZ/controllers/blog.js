var Post = require('./../models/post.js');
var Portfolio = require('./../models/portfolio.js');
var Comment = require('./../models/comment.js');
var PostViewModel = require('./../viewModels/post.js');
var PortfolioViewModel = require('./../viewModels/portfolio.js');
var qb = require('./../core/queryBuilder/index.js');
var session = require('express-session');
var _ = require('lodash');
// var hbs = require('./../views/script/index.js');
var SearchQb = require('./../core/queryBuilder/search-query-builder.js');

BlogController = {
	registerRoutes : function(app){
		app.get('/blog', this.getList);
		app.get('/search', this.search);
		app.get('/blog/:id', this.checkVisitor(app), this.get);
		app.post('/blog/:id', this.save);
		app.delete('/blog/:id', this.delete);
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
			console.log(data);
			result.blog = PostViewModel.getList(data, req.xhr);
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
				page:currentPage, limit:10, totalRows: 7
			};
			result.q = req.query.q;
			console.log(result);
			res.render('archive', result);
		})
	},
	getList : function(req, res){
		var currentPage = 1;
		if(req.query.page){
			currentPage = req.query.page
		};
		var that = this;
		var queryBuilder = new qb();
		queryBuilder.setup({
			limit : 2,
			page : req.query.page,
			whereCondition : {is_active : 1, type : 1}
		});
		Post.list(queryBuilder)
		.then(function(list){
			var data = PostViewModel.getList(list, req.xhr);
			data.pagination = 
			{ 
				page:currentPage, limit:2, totalRows: 7
			};
			res.render('blog', data);
		})
	},
	checkVisitor : function(app){
		app.use(session({ secret : 'v151t0r',
			saveUninitialized: true,
			resave: true,
			cookie : {
		    maxAge : 14400000, // 4 hours
		}
	}));
		return function(req, res, next){
			var id = 1;
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1;
			var yyyy = today.getFullYear();
			var h = today.getHours();
			var m = today.getMinutes()
			if(dd < 10){
				dd = "0" + dd;
			};
			if(mm < 10){
				mm = "0" + mm;
			};
			if(h < 10){
				h = "0" + h;
			}
			today = dd + '/' + mm + '/' + yyyy + " " + h + ":" + m;
			if(req.session.accessLog === undefined){
				req.session.accessLog = [];
				req.session.accessLog.push({
					visitor_id : id,
					post_id : req.params.id,
					read_date : today
				});
				id++;
				Post.getCheck(req.params.id)
				.then(function(model){
					var data = model.toJSON();
					data.visitor = data.visitor + 1;
					return Post.update(data)
				})
				.then(function(){
					return next()
				})
			} else { 
				var find = _.findIndex(req.session.accessLog, function(accessLog){
					return accessLog.post_id == req.params.id
				});
				if(find > -1){
					var obj = {};
					var i;
					_.each(req.session.accessLog, function(n, key){
						if(req.session.accessLog[key].post_id == req.params.id){
							i = req.session.accessLog.indexOf(req.session.accessLog[key]);
							_.forIn(req.session.accessLog[key], function(value, key){
								if(key == "read_date"){
									obj.read_date= today;
								} else {
									obj[key] = value 
								}
							})
						}
					});
					req.session.accessLog.splice(i, 0, obj);
					return next()
				} else {
					var visitorId;
					_.each(req.session.accessLog, function(n, key){
						_.forIn(req.session.accessLog[key], function(value, key){
							if(key == "visitor_id"){
								visitorId = value
							}
						})
					});
					req.session.accessLog.push({
						visitor_id : visitorId,
						post_id : req.params.id,
						read_date : today
					});
					console.log(req.session.accessLog);
					Post.getCheck(req.params.id)
					.then(function(model){
						var data = model.toJSON()
						data.visitor = data.visitor + 1;
						return Post.update(data)
					})
					.then(function(){
						return next()
					})
				}
			}
		}
	},
	get : function(req, res){
		Post.single(req.params.id, 1, req.xhr)
		.then(function(model){
			var data = PostViewModel.get(model.toJSON(), req.xhr);
			console.log(data);
			res.render('single', data);
		})
	},
	save : function(req, res){
		var result = req.body;
		if(result.parrent_id === ''){
			result.parrent_id = null;
		};
		result.post_id = req.params.id;
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

module.exports = BlogController;