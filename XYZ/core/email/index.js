var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

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
		html: mail.html
	}, function(err, info){
		if(err){
			return console.log(err);
		}
		console.log("message sent: " + info.response)
		callback();
	})
}

Email.prototype.verify = function(code, listClient){
	for(var i in listClient){
		if(listClient[i].verify === code){
			return true;
		} else {
			return false;
		}
	}
}

module.exports = Email;