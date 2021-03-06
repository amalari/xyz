var Portfolio = require('./../models/portfolio.js');
var Comment = require('./../models/comment.js');
var PortfolioViewModel = require('./../viewModels/portfolio.js');
var qb = require('./../core/queryBuilder/index.js');
var SearchQb = require('./../core/queryBuilder/search-query-builder.js');
var session = require('express-session');
var _ = require('lodash');

WorkController = {
	registerRoutes : function(app){
		app.get('/portfolio/:id',this.checkVisitor(app), this.get);
		app.get('/portfolio/like/:id', this.likePage(app));
		app.post('/portfolio/:id', this.save);
		app.delete('/portfolio/comment/:id', this.delete);
		app.get('/portfolio/area/search', this.areasearch);
	},
	likePage : function(app){
		app.use(session({ secret : 'v151t0r',
			saveUninitialized: true,
			resave: true,
			cookie : {
		    maxAge : 86400000, // 1 day
		}
	}));
		return function(req, res){
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
			if(req.session.preferredPage === undefined){
				req.session.preferredPage = [];
			};
			var find = _.findIndex(req.session.preferredPage, function(preferredPage){
				return preferredPage.portfolio_id == req.params.id
			});
			if(find === -1){
				req.session.preferredPage.push({
					portfolio_id : req.params.id,
					read_date : today
				});
				Portfolio.getCheck(req.params.id)
				.then(function(model){
					var data = model.toJSON();
					data.liker = data.liker + 1;
					return Portfolio.update(data)
				})
				.then(function(data){
					data = data.toJSON();
					res.send({success: true, likers : data.liker});
				})
			} else {
				req.session.preferredPage.splice(0,1);
				Portfolio.getCheck(req.params.id)
				.then(function(model){
					var data = model.toJSON();
					data.liker = data.liker - 1;
					return Portfolio.update(data)
				})
				.then(function(data){
					data = data.toJSON();
					res.send({success: true, likers : data.liker});
				})
			}
		}
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
					portfolio_id : req.params.id,
					read_date : today
				});
				Portfolio.getCheck(req.params.id)
				.then(function(model){
					var data = model.toJSON();
					data.visitor = data.visitor + 1;
					return Portfolio.update(data)
				})
				.then(function(){
					return next()
				})
			} else { 
				var find = _.findIndex(req.session.accessLog, function(accessLog){
					return accessLog.portfolio_id == req.params.id
				});
				if(find > -1){
					var obj = {};
					var i;
					_.each(req.session.accessLog, function(n, key){
						if(req.session.accessLog[key].portfolio_id == req.params.id){
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
					req.session.accessLog.splice(i, 1, obj);
					return next()
				} else {
					req.session.accessLog.push({
						portfolio_id : req.params.id,
						read_date : today
					});
					Portfolio.getCheck(req.params.id)
					.then(function(model){
						var data = model.toJSON()
						data.visitor = data.visitor + 1;
						return Portfolio.update(data)
					})
					.then(function(){
						return next()
					})
				}
			}
		}
	},
	areasearch : function(req, res){
		var currentPage = req.query.page || 1;
		var queryBuilder = new SearchQb();
		var result = {};
		queryBuilder.setup({
			limit : 10,
			page : currentPage,
			whereCondition : {is_active : 1}
		});
		queryBuilder.search(['area', 'LIKE', '%' + req.query.q + '%']);
		Portfolio.list(queryBuilder)
		.then(function(data){
			result.portfolio = {};
			result.portfolio.data = PortfolioViewModel.list(data.data);
			result.portfolio.total = data.total;
			result.pagination = 
			{ 
				page:currentPage, limit:10, totalRows: result.portfolio.total
			};
			result.q = req.query.q;
			res.render('archive2', result);
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	},
	get : function(req, res){
		Portfolio.single(req.params.id)
		.then(function(model){
			var data = model.toJSON();
			var result = PortfolioViewModel.get(data, req.xhr);
			result.deleteComment = false;
			var find = _.findIndex(req.session.preferredPage, function(preferredPage){
				return preferredPage.portfolio_id == req.params.id
			});
			if(find > -1){
				result.preferredPage = true;
			} else {
				result.preferredPage = false;
			};
			if(req.user != undefined){
				result.deleteComment = true;
			};
			result.fullUrl = req.protocol + "://" + req.subdomains + req.hostname + ":3000" + req.originalUrl;
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
		})
	},
	delete : function(req, res){
		Comment.delete(req.params.id)
		.then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			res.send({success: false, message : err.message})
		})
	}
}

module.exports = WorkController;