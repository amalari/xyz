var User = require('./../models/user.js');
var UserViewModel = require('./../viewModels/user.js');
var testAccount = require('./../testAccount/account.js');

UserController = {
	registerRoutes : function(app){
		app.post('/user', this.save);
	},
	save : function(req, res){
		var data = UserViewModel.save(req.body);
		User.save(data).then(function(){
			res.send({success : true})
		}).
		catch(function(err){
			res.send({success: false, message: err.message})
		})
	}
}

module.exports = UserController;