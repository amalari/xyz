var fs = require('fs'),
path = require('path'),
util = require('util');

function FileManager(options){
	this._dir = options.dir;
	this._baseUrl = options.baseUrl;
}

FileManager.prototype.delete = function(fileUrl){
	var split = fileUrl.split('/');
	var filename = split[split.length - 1];
	var fullPath = path.join(this._dir, filename);
	fs.unlink(fullPath, function(err) {
		if (err){
			console.log(err.message);
			console.log(err.stack);
			return;
		}
	})
};

/*
* this will running most of the time, be carefull when using launcher or mocha
*/
FileManager.prototype.getUrl = function(filename){	
	return util.format('%s/%s', this._baseUrl, filename);
}

module.exports = FileManager;