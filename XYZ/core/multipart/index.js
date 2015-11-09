var Busboy = require('busboy'),
os = require('os'),
path = require('path'),
fs = require('fs'),
sanitize = require('sanitize-filename'),
util = require('util');

function Multipart(options){
	this._uploadDir = options.uploadDir;
	this._allowedMimeTypes  = options.allowedMimeTypes || 'all';
	this._maxFileSize = options.maxFileSize || null;
}

Multipart.prototype._createDir = function(dir, callback){
	fs.exists(dir, function(exists){
		if(!exists){
			fs.mkdirSync(dir)
		}
		callback()
	});
}

Multipart.prototype._validateFile = function(mimetype) {
	return this._allowedMimeTypes == 'all' || this._allowedMimeTypes.indexOf(mimetype) > -1;
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
	_this._createDir(_this._uploadDir, function(){
		var busboy = new Busboy({headers:req.headers});
		var result = {};
		var arr =[];
		var key = 1;

		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
			console.log("saya saya saya saya saya");
			console.log(fieldname);
			if(arr.indexOf(fieldname) > -1){
				fieldname = fieldname + "_" + key;
				arr.push(fieldname);
				key++
			} else {
				arr.push(fieldname);
				fieldname = fieldname;
			}
			if (_this._validateFile(mimetype) && filename != null && filename != ""){
				var newFilename = _this._saveFile(file, filename);
				file.on('end', function(){
					result[fieldname] = newFilename;
				});
			} else {
				file.resume()
			}
		});
		busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
			console.log("saya saya saya saya saya");
			console.log(fieldname);
			result[fieldname] = val
		});
		busboy.on('finish', function() {
			callback(result);
		});
		req.pipe(busboy);
	});
};

module.exports = Multipart;