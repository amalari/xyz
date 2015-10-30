var ProjectRequest = require('./../models/projectRequest.js');

HomepageController = {
	registerRoutes : function(app){
		app.get('/homepage', this.list);
	},
	list : function(req, res){
		queryBuilder = new qb();
		queryBuilder.setup({
			limit : req.query.limit,
			page : req.query.page,
		});
		ProjectRequest.list(queryBuilder)
		.then(function(list){
			console.log("render homepage, limit page 12")
		})
		.catch(function(err){
			res.send({message : err.message})
		})
	}
}

module.exports = HomepageController;