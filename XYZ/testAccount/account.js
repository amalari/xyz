var authentication = require('./../core/authentication/index.js');
var UserModel = require('./../models/user.js');

function testAccount(){};

testAccount.prototype.initialize = function(user, callback){
	UserModel.check(user.email).then(function(model){
		if(model !== null){
			console.log("cek");
		} else {
			var result = {};
			result.fullname = user.fullname;
			result.email = user.email;
			result.password = authentication.authenticate(user.password);
			result.title = 'admin'
			callback(result);
		}
	})

}

// 	UserModel.getEmail(user.email).then(function(model){
// 		if(model !== null){
// 			req.flash('messageRegister','Email Already Exist')
// 			return null
// 		}
// 	}).
// 	then(function(data){
// 		UserModel.getFullname(model.attributes.fullname).then(function(model){
// 			if(model !== null){
// 				req.flash('messageRegister', 'Fullname Already Exist')
// 				return null
// 			} else {
// 				this.result.fullname = user.fullname;
// 				this.result.email = user.email;
// 				this.result.password = authentication.authenticate(user.password);
// 				this.result.title = 'admin'
// 			}
// 		})
// 	})
// }

// UserModel.check(user.email).then(function(data){
// 	if(data === null){
// 		return data.query(function(qb){
// 			qb.where('fullname', user.fullname)})
// 	} else {
// 		req.flash('messageRegister', 'Email Already Exist');
// 		res.redirect('/dashboard');
// 	}
// }).fetch().then(function(model){
// 	if(model === null){
// 		this.result.fullname = user.fullname;
// 		this.result.email = user.email;
// 		this.result.password = authentication.authenticate(user.password);
// 		this.result.title = 'admin'
// 	} else {
// 		req.flash('messageRegister', 'Name Already Exist');
// 		res.redirect('/dashboard')
// 	}
// })

module.exports = new testAccount();