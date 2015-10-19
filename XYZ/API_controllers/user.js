var User = require('./../models/user.js');
var UserViewModel = require('./../viewModels/user.js');
// var testAccount = require('./../tests/account.js');

UserController = {
	registerRoutes : function(app){
		console.log("register route user");
		app.post('/api/user', this.save);
		app.get('/api/user', this.list);
		app.get('/api/user/:id', this.single);
		app.delete('/api/user/:id', this.delete);
	},
	save : function(req, res){
		User.check(req.body.email).then(function(model){
			if(model !== null){
				req.flash('messageRegister', 'Email Already Exist');
				res.redirect('/user/create', req.flash('messageRegister'));
			} else {
				var data = UserViewModel.save(req.body);
				User.save(data)
				.then(function(){
					res.send({success : true})
				})
				.catch(function(err){
					res.send({success : false, message : err.message})
				})
			}
		})
	},
	list : function(req, res){
		User.list().then(function(listData){
			// console.log("controller list : " + listData);
			var data = listData.toJSON();
			res.send(UserViewModel.list(data))
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
		User.update(req.body).then(function(){
			res.send({success : true})
		}).
		catch(function(err){
			res.send({success : false, message : err.message})
		})
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