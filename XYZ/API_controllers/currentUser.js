CurrentUserController = {
	registerRoutes : function(app){
		console.log("current user");
		app.get('/api/current-user/', this.get);
	},
	get : function(req, res){
		var currentUser = {};
		currentUser.id = req.user.id;
		currentUser.fullname = req.user.fullname;
		currentUser.email = req.user.email;
		currentUser.image = req.user.image;
		res.send(currentUser);
	}
}

module.exports = CurrentUserController;