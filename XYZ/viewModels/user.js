var authentication = require('./../core/authentication/index.js');
var PostViewModel = require('./post.js');

UserViewModel = {
	save : function(user){
		var result = {};
		result.fullname = user.fullname;
		result.email = user.email;
		result.password = authentication.authenticate(user.password);
		result.title = 'admin';
		result.image = user.image;
		result.description = user.description;
		result.facebook = user.facebook;
		result.tumblr = user.tumblr;
		result.twitter = user.twitter;
		result.google_plus = user.google_plus;
		return result;
	},
	list : function(list){
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
	single : function(singleData, ajaxRequest){
		var result = {};
		result.id = singleData.id;
		result.email = singleData.email;
		result.fullname = singleData.fullname;
		result.title = singleData.title;
		result.image = singleData.image;
		result.description = singleData.description;
		result.facebook = singleData.facebook;
		result.tumblr = singleData.tumblr;
		result.twitter = singleData.twitter;
		result.google_plus = singleData.google_plus;
		result.oldPosts = [];
		if(!ajaxRequest){
			arr = singleData.posts.map(function(data){
				var obj={};
				if(data.is_active == 1 && data.type == 1){
					if(data.content){
						data.content = PostViewModel.summary(data.content, '16px')
					}
					for(i in data){
						obj[i] = data[i]
					}
					return obj;
				}

			});
			for(var i in arr){
				if(arr[i] !== undefined){
					result.oldPosts.unshift(arr[i])
				}
			};
			result.totalPosts = result.oldPosts.length;
		};
		return result;
	},
	delete : function(data){
		data.is_active = 0;
		return data;
	}
};

module.exports = UserViewModel;