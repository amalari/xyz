var ProjectRequest = require('./../models/projectRequest.js');
var qb = require('./../core/queryBuilder/index.js');

HomepageController = {
	registerRoutes : function(app){
		app.get('/homepage', this.list);
	},
	list : function(req, res){
		var queryBuilder = new qb();
		queryBuilder.setup({
			limit : req.query.limit,
			page : req.query.page,
		});
		ProjectRequest.list(queryBuilder)
		.then(function(list){
			res.render("homepage");
		})
		.catch(function(err){
			res.send({message : err.message})
		})
	}
}

module.exports = HomepageController;