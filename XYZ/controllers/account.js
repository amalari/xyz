var passport = require('passport');
var authentication = require('./../core/authentication/index.js');

AccountController = {
	registerRoutes : function(app){
		console.log("masuk ke account routing");
		app.get('/login', this.loginPage);
		app.post('/login', this.login);
		app.get('/dashboard',authentication.required, this.dashboard);
		app.get('/signout', this.signout);
	},
	loginPage : function(req, res){
		console.log("render page login");
		res.render('login', req.flash('message'));
	},
	login : passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
		failureFlash: true
	}),
	dashboard : function(req, res){
		res.render('index', {layout: false});
	},
	signout : function(req, res){
		req.logout();
		console.log("hapus " + req.user);
		res.redirect('/login');
	}
}

module.exports = AccountController;