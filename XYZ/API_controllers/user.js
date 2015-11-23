var User = require('./../models/user.js');
var UserViewModel = require('./../viewModels/user.js');
var qb = require('./../core/queryBuilder/index.js');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');
var authentication = require('./../core/authentication/index.js');

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
			var message = {};
			User.single(data.id).
			then(function(model){
				var user = model.toJSON();
				if(data.oldPass && data.newPass){
					if(!authentication.isValidPassword(data.oldPass, user.password)){
						message.status = false;
						message.message = "Password cannot replace because old password is not match with your current password"
					} else {
						user.password = authentication.authenticate(data.newPass)
						message.status = true;
						message.message = "Password has been changed, click following link to try your new password"
						return User.update(user);
					}
				} else {
					if(data.image){
						userFileManager.delete(user.image)
						data.image = userFileManager.getUrl(data.image);
					}
					return User.update(data);
				}
			})
			.then(function(){
				if(message.status){
					req.logout();
				};
				res.send({success : true, message: message})
			})
			.catch(function(err){
				res.send({success : false, message : err.message})
			})
		})
	},
	delete : function(req, res){
		var data = UserViewModel.delete(req.params);
		User.delete(data).then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	}
}

module.exports = UserController;