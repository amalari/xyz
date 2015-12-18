var Busboy = require('busboy'),
os = require('os'),
path = require('path'),
fs = require('fs'),
sanitize = require('sanitize-filename'),
util = require('util'),
im = require('imagemagick'),
sequence = require('when/sequence'),
Promise = require('bluebird');

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

Multipart.prototype.parseAndSaveFiles = function(req, options, callback) {
	var _this = this;
	_this._createDir(_this._uploadDir, function(){
		var busboy = new Busboy({headers:req.headers});
		var result = {};
		var arr =[];
		var key = 1;
		var createThumb = [];
		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
			if(arr.indexOf(fieldname) > -1){
				fieldname = fieldname + "_" + key;
				arr.push(fieldname);
				key++
			} else {
				arr.push(fieldname);
				fieldname = fieldname;
			};
			if (_this._validateFile(mimetype) && filename != null && filename != ""){
				var newFilename = _this._saveFile(file, filename);
				if(options != null && newFilename != null){
					_this.imageResizer(newFilename, options, fieldname, function(array){
						createThumb = array
					})
				};
				file.on('end', function(){
					result[fieldname] = newFilename;
					
				});
			} else {
				file.resume()
			};
		});
		busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
			result[fieldname] = val
		});
		busboy.on('finish', function() {
			if(options != null){
				if(options.synchronous == true){
					sequence(createThumb)
					.then(function(){
						callback(result);
					})
				} else {
					callback(result);
				}
			} else {
				console.log(result);
				callback(result);
			}
		});
		req.pipe(busboy);
	});
};

Multipart.prototype.imageResizer = function(image, options, fieldname, callback){
	if(options.synchronous == true){
		im = Promise.promisifyAll(require('imagemagick'));
		var array = [];
	};
	if(util.isArray(options.thumbnails) == false){
		var arr = [];
		arr.push(options.thumbnails);
		options.thumbnails = arr;
	};
	var _this = this;
	var arrNameFile = image.split('.');
	var ext = arrNameFile[arrNameFile.length-1];
	var nameFile = arrNameFile[0];
	var newFilename = "" ;
	options.thumbnails.forEach(function(thumbProperties, i){
		if(thumbProperties.fieldname == fieldname || thumbProperties.fieldname == null || thumbProperties.fieldname == undefined){
			newFilename = nameFile + "_" + thumbProperties.width.toString() +  "x" + thumbProperties.height.toString() + "." + ext;
			if(options.synchronous == true){
				array.push(function(){
					return im.resizeAsync({
						srcPath: _this._uploadDir + "/" + image,
						dstPath: _this._uploadDir + "/" + newFilename,
						width:   thumbProperties.width,
						height: thumbProperties.height,
						quality: 1 || thumbProperties.quality,
						format: ext
					})
				})
				callback(array);
			} else {
				im.resize({
					srcPath: _this._uploadDir + "/" + image,
					dstPath: _this._uploadDir + "/" + newFilename,
					width:   thumbProperties.width,
					height: thumbProperties.height,
					quality: 1 || thumbProperties.quality,
					format: ext
				}, function(err, stdout, stderr){
  					if (err) throw err;
  					console.log('resized')
				})
			}
		}
	})
};

module.exports = Multipart;