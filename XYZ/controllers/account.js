var passport = require('passport');
// var authenctication = require('./../core/authentication/');

AccountController = {
	registerRoutes : function(app){
		console.log("masuk ke account routing");
		app.get('/login', this.loginPage);
		app.post('/login', this.login);
	},
	loginPage : function(req, res){
		console.log("render page login");
		res.render('login', req.flash('message'));
	},
	login : passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
		failureFlash: true
	})
}

module.exports = AccountController;