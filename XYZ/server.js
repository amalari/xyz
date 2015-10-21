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
var hbs = require('./views/script/index.js');
//require index js in folder core and authentication
var authentication = require('./core/authentication/index.js');
var authorization = require('./core/authorization/index.js');
var User = require('./API_controllers/user.js');
var Post = require('./API_controllers/post.js');
var Portfolio = require('./API_controllers/portfolio.js');
var ProjectRequest = require('./API_controllers/projectRequest.js');
var Account = require('./controllers/account.js');
// var test = require('./tests/account.js');
var UserModel = require('./models/user.js');

//invoke hbs with 3 params ('extention name', 'name default layout that will used', var app )
var handlebars = new hbs('.html', 'main', app);
//invoke method init from hbs
handlebars.init();
//invoke method set from hbs
handlebars.set();
//define folder public as static content/file
app.use(express.static(__dirname + '/public'));
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
User.registerRoutes(app);
Post.registerRoutes(app);
Portfolio.registerRoutes(app);
ProjectRequest.registerRoutes(app);

app.listen(3003);