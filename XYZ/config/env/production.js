var path = require('path');
var roothPath = path.normalize(__dirname + '/../..');
var config = {
	port: process.env.OPENSHIFT_NODEJS_PORT,
	ipAddress : process.env.OPENSHIFT_NODEJS_IP,
	database: {
		client: 'mysql',
		connection: {
			host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
			port 	 : process.env.OPENSHIFT_MYSQL_DB_PORT,
			user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
			password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
			database : 'xyz',
			charset  : 'utf8'
		}
	},
	redis : { 
		host : process.env.REDISCLOUD_HOSTNAME, 
		port : process.env.REDISCLOUD_PORT, 
		pass : process.env.REDISCLOUD_PASSWORD
	},
	baseUploadPath : path.join(roothPath, '../data')
};

exports = module.exports = config;
