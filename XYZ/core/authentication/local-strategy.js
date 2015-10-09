var LocalStrategy = require('passport-local').Strategy;
var User = require('./../../models/user.js');
//define local strategy
var exports2 = {
	_bcrypt : function(bcrypt){
		return bcrypt
	},
	isValidPassword : function(pass, passEncrypted){
		console.log("password asli : " + pass);
		console.log("password encrypted : " + passEncrypted);
		return this._bcrypt.compareSync(pass, passEncrypted)
	},
	init : function(passport){
		console.log("local strategy");
		passport.use('local', new LocalStrategy({
			passReqToCallback : true
		}, function(req, email, password, done) {
			console.log(password);
			User.check(email)
			.then(function(model){
				var user;
				if(model === null){
					console.log("gagal login");
					return done(null, false, req.flash('message',{
						type: 'Notice',
						intro: 'Validation error',
						message: 'Incorect username'}));
				} else{
					console.log('model ke json');
					user = model.toJSON()
				}
				if(!this.isValidPassword(password, user.password)){
					console.log('password gagal');
					return done(null, false, req.flash('message',{
						type: 'Notice',
						intro: 'Validation error',
						message: 'Incorect password'}));
				}
				console.log(user);
				return done(null, user);

			})
			.catch(function(err){
				console.log(err);
				return done(err, null);
			})
		}));
	}
}

module.exports = exports2;