var nodemailer = require('nodemailer');

function Email(transporter){
	this._transporter = nodemailer.createTransport(transporter);
}

Email.prototype.send = function(mail){
	this._transporter.sendMail(
	{
		from: mail.from,
		to: mail.to,
		subject: mail.subject,
		text: mail.text
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