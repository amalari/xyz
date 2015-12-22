var ProjectRequest = require('./../models/projectRequest.js');
var qb = require('./../core/queryBuilder/index.js');
var ProjectRequestViewModel = require('./../viewModels/projectRequest.js');
var FileManager = require('./../core/file-manager/index.js');

ProjectRequestController = {
	registerRoutes : function(app){
		app.get('/api/project-request', this.list);
		app.get('/api/project-request/:id', this.single)
		app.delete('/api/project-request/:id', this.delete);
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
			var google_earth_file = data.google_earth_file.split(",");
			var design_reference_file = data.design_reference_file.split(",");
			data.google_earth_file = google_earth_file;
			data.design_reference_file = design_reference_file;
			res.send(data);
		})
		.catch(function(err){
			res.send({message: err.message})
		})
	},
	delete : function(req, res){
		ProjectRequest.single(req.params.id)
		.then(function(data){
			data = data.toJSON();
			var dir = data.google_earth_file.split("/");
			var projectFilemanager = new FileManager({
				dir : __dirname + '/../public/uploads/projects/' + dir[dir.length-2],
				baseUrl : '/uploads/projects' + dir[dir.length-2]
			});
			projectFilemanager.deleteFolder(__dirname + '/../public/uploads/projects/' + dir[dir.length-2]);
			return ProjectRequest.delete(req.params.id)
		})
		.then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			res.send({success : true, message: err.message})
		})
	}
}

module.exports = ProjectRequestController;