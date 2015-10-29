var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var hbs = require('nodemailer-express-handlebars');

function Email(transporter){
	this._transporter = nodemailer.createTransport(smtpTransport(transporter));
}

Email.prototype.send = function(mail, callback){
	console.log(this._transporter);
	this._transporter.sendMail(
	{
		from: mail.from,
		to: mail.to,
		subject: mail.subject,
		template: mail.template, 
		context : {
			body : mail.html
		}
	}, function(err, info){
		if(err){
			return console.log(err);
		}
		console.log("message sent: " + info.response)
		callback();
	})
}

// Email.prototype.setupHbs = function(options){
// 	this._transporter.use('compile', hbs(options));
// }

module.exports = Email;