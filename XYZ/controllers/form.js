var Client = require('./../models/client.js');
var ClientViewModel = require('./../viewModels/post.js');
var ProjectRequest = require('./../models/projectRequest');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');
var Email = require('./../core/email/index.js');

FormController = {
	registerRoutes : function(app){
		app.post('/form-1', this.saveClient);
		app.get('/form-2/verification', this.sendMail);
		app.get('/form-3', this.verification, this.update);
	},
	saveClient : function(req, res){
		var data = ClientViewModel.save(req.body);
		Client.save(data)
		.then(function(model){
			var client = ClientViewModel.hash(model.toJSON());
			return Client.update(client)
		})
		.then(function(newModel){
			var client = newModel.toJSON();
			res.redirect('/form-2/verification?code=' + client.verify)
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
				service : 'gmail',
				auth:{
					user: 'achmadjamaludin14@gmail.com',
					pass: 'astafista'
				}
			});
			email.send({
				form: 'achmadjamaludin14@gmail.com',
				to: client.email,
				subject: 'verification',
				html: '<a href=/form-3?code=' + client.verify
			});
			console.log("render terimakasih bla bla bla")
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