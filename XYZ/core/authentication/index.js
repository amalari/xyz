var session = require('express-session');
var passport = require('passport');
var localStrategy = require('./local-strategy.js');
var bcrypt = require('bcrypt-nodejs');
var RedisStore = require('connect-redis')(session);

function Authentication(){};

Authentication.prototype.init = function(app){
	console.log("authentication init");
	app.use(session({ secret : 'xyzpr0j3ct',
		saveUninitialized: true,
		store : new RedisStore({ 
			host : '127.0.0.1', 
			port : '6379',
		}),
		resave: true,
		cookie : {
		    maxAge : 28800000, // 8 hours
		}
	}));
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
};

Authentication.prototype.isValidPassword =  function(pass, passEncrypted){
	return bcrypt.compareSync(pass, passEncrypted)
};

/*url = diisi dengan string url nya
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
