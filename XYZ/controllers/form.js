var Client = require('./../models/client.js');
var ClientViewModel = require('./../viewModels/client.js');
var ProjectRequest = require('./../models/projectRequest');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');
var Email = require('./../core/email/index.js');

FormController = {
	registerRoutes : function(app){
		app.get('/client-form', this.getFormClient);
		app.post('/client-form', this.saveClient);
		app.get('/client-form/verification', this.sendMail);
		app.get('/project-form', this.verification, this.update);
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
	update : function(req, res){
		Client.get(req.query.code)
		.then(function(model){
			var client = model.toJSON();
			client.is_active = 1;
			return Client.update(client);
		})
		.then(function(){
			console.log("render page yang form project request + kata terimakasihnya")
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
				rejectUnauthorized: true
			});
			email.send({
				form: 'achmadjamaludin14@gmail.com',
				to: client.email,
				subject: 'verification',
				html: '<a href="/project-form?code="' + client.verify.toString()
			}, function(){
				console.log("render terimakasih bla bla bla")
			});
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	},
	verification : function(req, res, next){
		var email = new Email();
		if(email.verify(req.query.code)){
			return next();
		} else {
			return res.send(404, {message : "form not found"})
		}
	}
}

module.exports = FormController;