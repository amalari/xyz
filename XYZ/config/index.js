var all = require('./env/all'),
development = require('./env/development'),
production = require('./env/production'),
extend = require('util')._extend,
env = process.env.NODE_ENV || 'development';

var config = {};

if (env === 'production'){
	config = extend(all, production);
}else{
	config = extend(all, development);
}

exports = module.exports = config;