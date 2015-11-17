var authentication = require('./../core/authentication/index.js');

UserViewModel = {
	save : function(user){
		var result = {};
		result.fullname = user.fullname;
		result.email = user.email;
		result.password = authentication.authenticate(user.password);
		result.title = 'admin';
		result.image = user.image;
		result.description = user.description;
		return result;
	},
	list : function(list){
		// console.log(listData);
		var result = {};
		result.data = list.data.map(function(data){
			var x = {};
			x.id = data.id;
			x.email = data.email;
			x.fullname = data.fullname;
			x.title = data.title;
			return x;
		})
		result.total = list.total;
		return result

	},
	single : function(singleData){
		var result = {};
		result.id = singleData.id;
		result.email = singleData.email;
		result.fullname = singleData.fullname;
		result.title = singleData.title;
		result.image = singleData.image;
		return result;
	},
	delete : function(data){
		console.log(data);
		data.is_active = 0;
		return data;
	}
};

module.exports = UserViewModel;