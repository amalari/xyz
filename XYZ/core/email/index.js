var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var hbs = require('nodemailer-express-handlebars');

function Email(){
	this._transporter = nodemailer.createTransport(smtpTransport({
		host: 'smtp.gmail.com',
		port: 587,
		service : 'Gmail',
		auth:{
			user: 'achmadjamaludin14@gmail.com',
			pass: 'astafista'
		},
		rejectUnauthorized: true,
		secure : false
	}));

}

Email.prototype.setup = function(handlebars){
	this._transporter.use('compile', hbs({
		extName : '.html',
		viewPath : __dirname + '/../../views/layouts',
		viewEngine : handlebars
	}));
};

Email.prototype.send = function(mail){
	var templateEmail = "";
	if(mail.lang === "eng"){
		templateEmail = "email-english"
	} else {
		templateEmail = "email-indonesia"
	}
	this._transporter.sendMail(
	{
		from: mail.from,
		to: mail.to,
		subject: mail.subject,
		template: templateEmail, 
		context : {
			body : mail.html
		}
	}, function(err, info){
		if(err){
			return console.log(err);
		}
		console.log("message sent: " + info.response)
	})
}

module.exports = new Email();