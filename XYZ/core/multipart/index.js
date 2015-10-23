var Busboy = require('busboy'),
os = require('os'),
path = require('path'),
fs = require('fs'),
sanitize = require('sanitize-filename'),
util = require('util');

function Multipart(options){
	this._uploadDir = options.uploadDir;
	this._allowedMimeTypes  = options.allowedMimeTypes;
	this._maxFileSize = options.maxFileSize || null;
}

Multipart.prototype._createDir = function(dir){
	fs.exists(dir, function(exists){
		if(!exists){
			fs.mkdirSync(dir)
		}
	});
}

Multipart.prototype._validateFile = function(mimetype) {
	return this._allowedMimeTypes.indexOf(mimetype) > -1;
}

Multipart.prototype._saveFile = function(file, filename){
	var currentTimestamp = new Date().getTime();
	var newFilename = util.format('%s_%s', currentTimestamp, sanitize(filename).replace(/ /g,'_'));
	var saveTo = path.join(this._uploadDir, newFilename);
	file.pipe(fs.createWriteStream(saveTo));
	return newFilename;
}

Multipart.prototype.parseAndSaveFiles = function(req, callback) {
	var _this = this;
	var busboy = new Busboy({headers:req.headers});
	var result = {};
	_this._createDir(_this._uploadDir);

	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		if (_this._validateFile(mimetype)){
			var newFilename = _this._saveFile(file, filename);
			file.on('end', function(){
				result[fieldname] = newFilename;
			});
		}
	});
	busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
		result[fieldname] = val
	});
	busboy.on('finish', function() {
		callback(result);
	});
	req.pipe(busboy);
};

module.exports = Multipart;