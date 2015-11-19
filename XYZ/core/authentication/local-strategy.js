var PassportLocal = require('passport-local').Strategy;
var User = require('./../../models/user.js');
var bcrypt = require('bcrypt-nodejs');
//define local strategy

var isValidPassword =  function(pass, passEncrypted){
	return bcrypt.compareSync(pass, passEncrypted)
};

var exports2 = {
	init : function(passport){
		passport.use('local', new PassportLocal({
			passReqToCallback : true,
			usernameField: 'email',
			passwordField: 'password'
		}, function(req, email, password, done) {
			User.check(email)
			.then(function(model){
				var user;
				if(model === null){
					return done(null, false, req.flash('message',{
						type: 'Notification',
						message: 'Incorect Username'}));
				} else{
					user = model.toJSON()
				}
				if(!isValidPassword(password, user.password)){
					return done(null, false, req.flash('message',{
						type: 'Notification',
						message: 'Incorect Password'}));
				}
				return done(null, user);

			})
			.catch(function(err){
				return done(err, null);
			})
		}));
	}
}

module.exports = exports2;