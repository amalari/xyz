var User = require('./../models/user.js');
var UserViewModel = require('./../viewModels/user.js');
var qb = require('./../core/queryBuilder/index.js');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');
// var testAccount = require('./../tests/account.js');

var userMultipart = new Multipart({
	uploadDir : __dirname + '/../public/uploads/user',
	allowedMimeTypes : ['image/jpeg', 'image/png', 'image/gif' ]
});

var userFileManager = new FileManager({
	dir : __dirname + '/../public/uploads/user',
	baseUrl : '/uploads/user'
});

UserController = {
	registerRoutes : function(app){
		console.log("register route user");
		app.post('/api/user', this.save);
		app.get('/api/user', this.list);
		app.get('/api/user/:id', this.single);
		app.delete('/api/user/:id', this.delete);
		app.put('/api/user/:id', this.update);
	},
	save : function(req, res){
		userMultipart.parseAndSaveFiles(req, function(data){
			data.image = userFileManager.getUrl(data.image);
			User.check(data.email).then(function(model){
				if(model !== null){
					req.flash('messageRegister', 'Email Already Exist');
					res.redirect('/user/create', req.flash('messageRegister'));
				} else {
					var result = UserViewModel.save(data);
					User.save(result)
					.then(function(){
						res.send({success : true})
					})
					.catch(function(err){
						res.send({success : false, message : err.message})
					})
				}
			})
		})
	},
	list : function(req, res){
		console.log("req.route :");
		console.log(req.route);
		console.log("req.baseUrl :");
		console.log(req.url);
		console.log("req.originalUrl :");
		console.log(req.originalUrl);
		console.log("req.hostname :");
		console.log(req.hostname);
		var queryBuilder = new qb();
		queryBuilder.setup({
			whereCondition : {is_active : 1}
		});
		User.list(queryBuilder)
		.then(function(list){
			res.send(UserViewModel.list(list))
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	},
	single : function(req, res){
		User.single(req.params.id).then(function(singleData){
			var data = singleData.toJSON();
			res.send(UserViewModel.single(data))
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	},
	update : function(req, res){
		userMultipart.parseAndSaveFiles(req, function(data){
			console.log("______________________________");
			User.single(data.id).
			then(function(model){
				var user = model.toJSON();
				if(data.image){
					userFileManager.delete(user.image)
					data.image = userFileManager.getUrl(data.image);
				}
				console.log(data);
				return User.update(data);
			})
			.then(function(){
				res.send({success : true})
			})
			.catch(function(err){
				res.send({success : false, message : err.message})
			})
		})
		// User.update(req.body).then(function(){
		// 	res.send({success : true})
		// }).
		// catch(function(err){
		// 	res.send({success : false, message : err.message})
		// })
	},
	delete : function(req, res){
		console.log('lewat delete');
		var data = UserViewModel.delete(req.params);
		console.log(data);
		User.delete(data).then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	}
}

module.exports = UserController;