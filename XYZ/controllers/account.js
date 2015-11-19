var passport = require('passport');
var authentication = require('./../core/authentication/index.js');

AccountController = {
	registerRoutes : function(app){
		app.get('/login', this.loginPage);
		app.post('/login', this.login);
		app.get('/dashboard',authentication.required, this.dashboard);
		app.get('/signout', this.signout);
	},
	loginPage : function(req, res){
		var message = req.flash('message');
		if(Array.isArray(message)){
			message = message[0];
		};
		res.render('login', {layout: false,
			message : message});
	},
	login : passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
		failureFlash: true
	}),
	dashboard : function(req, res){
		res.render('index', {layout: false,});
	},
	signout : function(req, res){
		req.logout();
		res.redirect('/login');
	}
}

module.exports = AccountController;