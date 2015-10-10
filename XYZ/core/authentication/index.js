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

/*request = diisi req.xhr nya
url = diisi dengan string url nya
status = status yang akan diikirim sebagai http status
msg = message yang akan dikirim jika user not authenticated*/
Authentication.prototype.requestAjax = function(url, status, msg){
	return function(req, res, next){
		if(!req.xhr){
			res.redirect(url);
		} else if(!req.isAuthenticated()){
			res.send(status, {message : msg})
		} else {
			next()
		}
	}
};

Authentication.prototype.required = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
};

module.exports = new Authentication();
