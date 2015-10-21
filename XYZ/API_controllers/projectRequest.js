var ProjectRequest = require('./../models/projectRequest.js');
var qb = require('./../core/queryBuilder/index.js');
// var ProjectRequestViewModel = require('./../viewModels/projectRequest.js');

ProjectRequestController = {
	registerRoutes : function(app){
		console.log("controller request")
		app.get('/api/project-request', this.list);
	},
	list : function(req, res){
		queryBuilder = new qb();
		queryBuilder.setup({
			imit : req.query.limit,
			page : req.query.page,
		});
		ProjectRequest.list(queryBuilder)
		.then(function(list){
			res.send(list)
		})
		.catch(function(err){
			res.send({message : err.message})
		})
	}
}

module.exports = ProjectRequestController;