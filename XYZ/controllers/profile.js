var User = require('./../models/user.js');
var UserViewModel = require('./../viewModels/user.js');
var qb = require('./../core/queryBuilder/index.js');
var FileManager = require('./../core/file-manager/index.js');

ProfileController = {
	registerRoutes : function(app){
		app.get('/profile/:id', this.single);
	},
	single : function(req, res){
		User.single(req.params.id).then(function(singleData){
			var data = UserViewModel.single(singleData.toJSON());
			data.posts = [];
			if(!req.xhr){
				data.oldPosts.reverse();
				data.oldPosts.forEach(function(val, i){
					if(i < 3){
						data.posts.unshift(val)
					}
				})
				res.render('profile', data);
			} else {
				var page = parseInt(req.query.page);
				var limit = parseInt(req.query.limit);
				var counter = 1;
				var start = (page - 1) * limit;
				data.oldPosts.forEach(function(val,i){
					if(i >= start && counter <= limit){
						data.posts.unshift(val);
						counter++
					}
				});
				res.render('profile-posts', {layout: false, data: data});
			}
		})
	}
}

module.exports = ProfileController;