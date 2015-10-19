var authentication = require('./../core/authentication/index.js');
var User = require('./../models/user.js');

UserViewModel = {
	save : function(user){
		var result = {};
		result.fullname = user.fullname;
		result.email = user.email;
		result.password = authentication.authenticate(user.password);
		result.title = 'admin';
		return result;
	},
	list : function(listData){
		// console.log(listData);
		var result = listData.map(function(data){
			var x = {};
			x.id = data.id;
			x.email = data.email;
			x.fullname = data.fullname;
			x.title = data.title;
			return x;
		})
		// console.log(result)
		return result

	},
	single : function(singleData){
		var result = {};
		result.id = singleData.id;
		result.email = singleData.email;
		result.fullname = singleData.fullname;
		result.title = singleData.title;
		console.log(result);
		return result;
	},
	delete : function(data){
		console.log(data);
		data.is_active = 0;
		return data;
	}
};

module.exports = UserViewModel;