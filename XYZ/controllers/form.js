var Client = require('./../models/client.js');
var ClientViewModel = require('./../viewModels/client.js');
var ProjectRequest = require('./../models/projectRequest.js');
var ProjectRequestViewModel = require('./../viewModels/projectRequest.js');
var qb = require('./../core/queryBuilder/index.js');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');
var email = require('./../core/email/index.js');

sendMail = function(client){
	email.send({
		form: 'achmadjamaludin14@gmail.com',
		to: client.email,
		subject: 'verification',
		html: '<a class="btn btn-default" href="localhost:3003/project-form?code=' + client.verify + ' + &clientId=' + client.clientId + '">Click Here</a>'
	});
};

FormController = {
	registerRoutes : function(app){
		app.get('/request-intro', this.getRequestIntro);
		app.get('/client-form', this.getFormClient);
		app.post('/client-form', this.saveClient);
		app.get('/resend-email', this.formResendEmail);
		app.post('/resend-email', this.resendEmail);
		app.get('/project-form', this.verification, this.update);
		app.post('/project-form', this.saveProject);
	},
	getRequestIntro : function(req, res){
		res.render('request-intro');
	},
	getFormClient : function(req, res){
		res.render('client-form');
	},
	saveClient : function(req, res){
		console.log("------------------");
		var data = ClientViewModel.save(req.body);
		var compare;
		do{
			console.log("lewat sini ga?");
			console.log(data.verify);
			Client.get(data.verify)
			.then(function(model){
				compare = model;
			})
		}
		while(compare === null);
		Client.save(data)
		.then(function(model){
			var client = model.toJSON();
			req.session.registeredUser = client;
			sendMail(client);
			res.redirect('/resend-email');
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
		console.log(req.query.code);
		Client.get(req.query.code)
		// .then(function(model){
		// 	var client = model.toJSON();
		// 	client.is_active = 1;
		// 	return Client.update(client);
		// })
		.then(function(model){
			var client = model.toJSON();
			console.log(client);
			res.render("project-form", {code : req.query.code, clientId : client.id})
		})
	},
	formResendEmail: function(req, res){
		var client = JSON.parse(JSON.stringify(req.session.registeredUser));
		delete req.session.registeredUser;
		res.render('resend-email', client);
	},
	resendEmail: function(req, res){
		sendMail(req.body);
		res.render('resend-email', req.body);
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
			console.log(data);
			for(var i in data){
				if(data[i].verify === req.query.code){
					code = 	data[i].verify			}
				}
				if(code !== 'undefined'){
					console.log("_________FNSOFKNSDOFNSOKFNSOFNOS");
					return next();
				} else {
					res.send(404, {message : "form not found"})
				}
				// 	return next()
				// } else {
				// 	res.send(404, {message : "form not found"})
				// }
				//temporaray
			})
	}
}

module.exports = FormController;