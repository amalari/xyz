var ProjectRequest = require('./../models/projectRequest.js');
var qb = require('./../core/queryBuilder/index.js');
var ProjectRequestViewModel = require('./../viewModels/projectRequest.js');

ProjectRequestController = {
	registerRoutes : function(app){
		app.get('/api/project-request', this.list);
		app.get('/api/project-request/:id', this.single);
	},
	list : function(req, res){
		queryBuilder = new qb();
		queryBuilder.setup({
			limit : req.query.limit,
			page : req.query.page,
		});
		ProjectRequest.list(queryBuilder)
		.then(function(list){
			list.data = ProjectRequestViewModel.getList(list.data);
			res.send(list)
		})
		.catch(function(err){
			res.send({message : err.message})
		})
	},
	single : function(req, res){
		ProjectRequest.single(req.params.id)
		.then(function(model){
			var data = model.toJSON();
			var design_reference_file = data.design_reference_file.split(",");
			data.design_reference_file = design_reference_file;
			res.send(data);
		})
		.catch(function(err){
			res.send({message: err.message})
		})
	}
}

module.exports = ProjectRequestController;