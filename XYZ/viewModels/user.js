var authentication = require('./../core/authentication/index.js');
var User = require('./../models/user.js');

UserViewModel = {
	save : function(user){
		var result = {};
		result.email = user.email;
		result.password = authentication.authenticate(user.password);
		result.fullname = user.fullname;
		result.role = 'admin';
		return result
	}
};

module.exports = UserViewModel;