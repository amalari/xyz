//using library express
var express = require('express');
//add express to variable app
var app = express();
//using library body parser
var bodyParser = require('body-parser');
//using library cookie parser
var cookieParser = require('cookie-parser');
//using library flash
var flash = require('connect-flash');
//using library index.js from folder views as var hbs
var hbs = require('./core/handlebar/index.js');
var email = require('./core/email');
var config = require('./config');
//require index js in folder core and authentication
var authentication = require('./core/authentication/index.js');
var authorization = require('./core/authorization/index.js');
var User = require('./API_controllers/user.js');
var Post = require('./API_controllers/post.js');
var Category = require('./API_controllers/category.js');
var Portfolio = require('./API_controllers/portfolio.js');
var ProjectRequest = require('./API_controllers/projectRequest.js');
var CurrentUser = require('./API_controllers/currentUser.js');
var Account = require('./controllers/account.js');
var Tinyvision = require('./controllers/listImage.js');
var FormProject = require('./controllers/form.js');
var Homepage = require('./controllers/homepage.js');
var About = require('./controllers/about.js');
var Blog = require('./controllers/blog.js');
var Work = require('./controllers/work.js');
// var test = require('./tests/account.js');
// var UserModel = require('./models/user.js');
var CategoryPublic = require('./controllers/category.js')
var Contact = require('./controllers/contact.js');
var env = process.env.NODE_ENV || 'development';

//invoke hbs with 3 params ('extention name', 'name default layout that will used', var app )
var handlebars = new hbs('.html', 'main', app);
email.setup(handlebars._handlebars);

//invoke method init from hbs
handlebars.init();
//invoke method set from hbs
handlebars.set();
handlebars.pagination();
//define folder public as static content/file
app.use(express.static(__dirname + '/public'));
if(env == 'production'){
	app.use('/public/uploads', express.static(__dirname + '/../data'));
}
//use middleware body parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
	extended: true,
	limit: '50mb'
}));
app.use(cookieParser());
//invoke flash to use middleware flash
app.use(flash());
// var user = {fullname : "achmad jamal", email : "achmad@gmail", password: "aa"};
// test.initialize(user, function(){
// 	UserModel.save(data);
// });
//invoke authentication init with app parameter
authentication.init(app);
// app.use('/dashboard', authorization.required(['admin']));
// app.use('/login', );
app.use('/api', authentication.requestAjax('/login', 401, 'User not valid'));

Account.registerRoutes(app);
CurrentUser.registerRoutes(app);
User.registerRoutes(app);
Post.registerRoutes(app);
Category.registerRoutes(app);
Portfolio.registerRoutes(app);
ProjectRequest.registerRoutes(app);
Tinyvision.registerRoutes(app);
FormProject.registerRoutes(app);
Homepage.registerRoutes(app);
About.registerRoutes(app);
Blog.registerRoutes(app);
Work.registerRoutes(app);
CategoryPublic.registerRoutes(app);
Contact.registerRoutes(app);

app.listen(config.port, function(){
	console.log("Listening on %s, server_port %s", config.ipAddress, config.port);
});