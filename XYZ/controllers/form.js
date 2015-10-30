var Client = require('./../models/client.js');
var ClientViewModel = require('./../viewModels/client.js');
var ProjectRequest = require('./../models/projectRequest.js');
var ProjectRequestViewModel = require('./../viewModels/projectRequest.js');
var qb = require('./../core/queryBuilder/index.js');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');
var Email = require('./../core/email/index.js');


FormController = {
	registerRoutes : function(app){
		app.get('/client-form', this.getFormClient);
		app.post('/client-form', this.saveClient);
		app.get('/client-form/verification', this.sendMail);
		app.get('/project-form', this.verification, this.update);
		app.post('/project-form', this.saveProject);
	},
	getFormClient : function(req, res){
		res.render('client-form');
	},
	saveClient : function(req, res){
		var data = ClientViewModel.save(req.body);
		Client.get(data.verify)
		.then(function(model){
			if(model !== null){
				data.verify = ClientViewModel.generateToken()
			};
			return Client.save(data);
		})
		.then(function(model){
			var client = model.toJSON();
			res.redirect('/client-form/verification?code=' + client.verify)
		})
	},
	saveProject: function(req, res){
		var formMultipart = new Multipart({
			uploadDir : __dirname + '/../public/uploads/projects/'+ req.query.code,
			allowedMimeTypes : ['image/jpeg', 'image/png', 'image/gif' ]
		});
		var formFileManager = new FileManager({
			dir : __dirname + '/../public/uploads/projects/'+ req.query.code,
			baseUrl : '/uploads/projects/'+ req.query.code
		});
		formMultipart.parseAndSaveFiles(req, function(data){
			var newData = {};
			newData.client_id = req.query.clientId;
			for(var key in data){
				if(key.indexOf("file") > -1){
					newData[key] = formFileManager.getUrl(data[key])
				} else {
					newData[key] = data[key];
				}
			};
			var result = ProjectRequestViewModel.save(newData);
			ProjectRequest.save(result)
			.then(function(){
				res.render("finish-form")
			})
		})
	},
	update : function(req, res){
		Client.get(req.query.code)
		.then(function(model){
			var client = model.toJSON();
			client.is_active = 1;
			return Client.update(client);
		})
		.then(function(model){
			var client = model.toJSON();
			res.render("project-form", {code : req.query.code, clientId : client.id})
		})
	},
	sendMail : function(req, res){
		Client.get(req.query.code)
		.then(function(model){
			var client = model.toJSON();
			var email = new Email({
				host: 'smtp.gmail.com',
				port: 587,
				service : 'Gmail',
				auth:{
					user: 'achmadjamaludin14@gmail.com',
					pass: 'astafista'
				},
				rejectUnauthorized: true,
				secure : false
			});
			email.send({
				form: 'achmadjamaludin14@gmail.com',
				to: client.email,
				subject: 'verification',
				html: '<a href="/project-form?code="' + client.verify
			}, function(){
				res.redirect('/project-form')
			});
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	},
	verification : function(req, res, next){
		var code;
		var queryBuilder = new qb();
		queryBuilder.setup({
			whereCondition : {is_active : 0}
		});
		Client.list(queryBuilder)
		.then(function(listModel){
			var data = listModel.toJSON();
			for(var i in data){
				if(data[i].verify === req.query.code){
					code = 	data[i].verify			}
				}
				if(code){
					return next()
				} else {
					res.send(404, {message : "form not found"})
				}
			})
	}
}

module.exports = FormController;