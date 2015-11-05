var Category = require('./../models/category.js');
var qb = require('./../core/queryBuilder/index.js');
// var testAccount = require('./../tests/account.js');


CategoryController = {
	registerRoutes : function(app){
		console.log("category route");
		app.post('/api/category', this.save);
	},
	save : function(req, res){
		Category.save(req.body)
		.then(function(){
			console.log("redirect ke form pengisian blog atau portofolio");
		})
	}
}

module.exports = CategoryController;