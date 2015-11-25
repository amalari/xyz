var Post = require('./../models/post.js');
var Comment = require('./../models/comment.js');
var PostViewModel = require('./../viewModels/post.js');
var qb = require('./../core/queryBuilder/index.js');
var session = require('express-session');
var _ = require('lodash');

BlogController = {
	registerRoutes : function(app){
		app.get('/blog', this.getList);
		app.get('/blog/:id', this.checkVisitor(app), this.get);
		app.get('/blog/like/:id', this.likePage(app));
		app.post('/blog/:id', this.save);
		app.delete('/blog/comment/:id', this.delete);
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
				page:currentPage, limit:2, totalRows: data.total
			};
			res.render('blog', data);
		})
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
			console.log(req.session.preferredPage);
			if(req.session.preferredPage === undefined){
				req.session.preferredPage = [];
			};
			var find = _.findIndex(req.session.preferredPage, function(preferredPage){
				return preferredPage.post_id == req.params.id
			});
			if(find === -1){
				req.session.preferredPage.push({
					post_id : req.params.id,
					read_date : today
				});
				Post.getCheck(req.params.id)
				.then(function(model){
					var data = model.toJSON();
					data.liker = data.liker + 1;
					return Post.update(data)
				})
				.then(function(data){
					data = data.toJSON();
					res.send({success : true, likers: data.liker});
				})
			} else {
				req.session.preferredPage.splice(0,1);
				Post.getCheck(req.params.id)
				.then(function(model){
					var data = model.toJSON();
					data.liker = data.liker - 1;
					return Post.update(data)
				})
				.then(function(data){
					data = data.toJSON();
					res.send({success : true, likers: data.liker});
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
					post_id : req.params.id,
					read_date : today
				});
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
					req.session.accessLog.push({
						post_id : req.params.id,
						read_date : today
					});
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
			data.deleteComment = false;
			var find = _.findIndex(req.session.preferredPage, function(preferredPage){
				return preferredPage.post_id == req.params.id
			});
			if(find > -1){
				data.preferredPage = true;
			} else {
				data.preferredPage = false;
			};
			if(req.user != undefined){
				data.deleteComment = true;
			};
			data.fullUrl = req.protocol + "://" + req.subdomains + req.hostname + ":3000" + req.originalUrl;
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
};


module.exports = BlogController;