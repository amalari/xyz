var ProjectRequest = require('./../models/projectRequest.js');
var qb = require('./../core/queryBuilder/index.js');
// var ProjectRequestViewModel = require('./../viewModels/projectRequest.js');

ProjectRequestController = {
	registerRoutes : function(app){
		console.log("controller request")
		app.get('/api/project-request', this.list);
		app.get('/api/project-request/:id', this.single);
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
	},
	single : function(req, res){
		console.log("lewat sini kan?");
		ProjectRequest.single(req.params.id)
		.then(function(model){
			var data = model.toJSON();
			console.log(data);
			res.send(data);
		})
		.catch(function(err){
			res.send({message: err.message})
		})
	}
}

module.exports = ProjectRequestController;