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
		form: 'xyz.cartel1@gmail.com',
		to: client.email,
		subject: 'Verification',
		html: '<a style="padding: 8px 12px;margin-top: 25px;margin-bottom: 25px;border-radius:6px;font-family:Serif;background-color: #212121 !important;color:#fff !important;width:136px;font-size: 18px;text-decoration: none;background-image: -webkit-linear-gradient(top,#212121 0,#212121 100%);" class="btn btn-primary req-form-button" href="http://xyz-cartel.rhcloud.com/project-form?code=' + client.verify  + '&clientId=' + client.id + '">verify</a>',
		lang: client.lang,
		name: client.name
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
		if(req.query.lang === "eng"){
			req.session.language = "eng";
			res.render('client-form-eng');
		} else {
			req.session.language = "ind"
			res.render('client-form-ind');
		};
	},
	saveClient : function(req, res){
		var data = ClientViewModel.save(req.body);
		var compare;
		do{
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
			client.lang = req.session.language;
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
		Client.get(req.query.code)
		.then(function(model){
			var client = model.toJSON();
			client.is_active = 1;
			return Client.update(client);
		})
		.then(function(){
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
					var lang={};
					if(req.session.language === "ind"){
						lang.ind = true;
					} else {
						lang.eng = true;
					}
					delete req.session.language;
					res.render("finish-form", {eng : lang.eng, ind : lang.ind})
				})
			})
		})
	},
	update : function(req, res){
		Client.get(req.query.code)
		.then(function(model){
			var client = model.toJSON();
			if(req.session.language === "ind"){
				client.ind = true
			} else {
				client.eng = true;
			};
			res.render("project-form", {code : req.query.code, clientId : client.id, ind:client.ind, eng: client.eng})
		})
	},
	formResendEmail: function(req, res){
		var client = JSON.parse(JSON.stringify(req.session.registeredUser));
		if(req.session.language === "ind"){
			client.ind = true
		} else {
			client.eng = true;
		};
		delete req.session.registeredUser;
		res.render('resend-email', client);
	},
	resendEmail: function(req, res){
		sendMail(req.body);
		if(req.body.lang === "ind"){
			req.body.ind = true
		} else {
			req.body.eng = true;
		};
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
			for(var i in data){
				if(data[i].verify === req.query.code){
					code = 	data[i].verify			}
				}
				if(code != undefined){
					return next();
				} else {
					res.send(404, {message : "form not found"})
				}
			})
	}
}

module.exports = FormController;