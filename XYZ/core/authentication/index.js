var session = require('express-session');
var passport = require('passport');
var localStrategy = require('./local-strategy.js');
var bcrypt = require('bcrypt-nodejs');

function Authentication(){};

Authentication.prototype.init = function(app){
	console.log("authentication init");
	app.use(session({ secret : 'xyzpr0j3ct'}));
	app.use(passport.initialize());
	app.use(passport.session());
	passport.serializeUser(function(user, done){
		done(null, user);
	});
	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});
	localStrategy.init(passport);

};

Authentication.prototype.authenticate = function(password){
	var salt = bcrypt.genSaltSync(5);
	return bcrypt.hashSync(password, salt);
}

module.exports = new Authentication();
