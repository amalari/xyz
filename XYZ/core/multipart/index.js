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

Multipart.prototype.parseAndSaveFiles = function(req, callback) {
	var _this = this;
	_this._createDir(_this._uploadDir, function(){
		var busboy = new Busboy({headers:req.headers});
		var result = {};
		var arr =[];
		var key = 1;
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
				callback(result);
		});
		req.pipe(busboy);
	});
};

Multipart.prototype.createImageResizer = function(data, thumbnails, callback){
	var _this = this;
	var createThumb = [];
	for(key in data){
		if(Array.isArray(thumbnails)){
			thumbnails.forEach(function(optThumb){
				if(key.indexOf(optThumb.fieldname) > -1){
					if(optThumb.synchronous){
						_this.imageResizer(data[key], optThumb, function(array){
							createThumb = array;
						})
					} else {
						_this.imageResizer(data[key], optThumb);
					}
				}
			})
		} else {
			if(key.indexOf(thumbnails.fieldname) > -1){
				console.log("aslknfadsklfnasklfas");
				console.log(data);
				console.log(thumbnails);
				if(thumbnails.synchronous){
					_this.imageResizer(data[key], thumbnails, function(array){
						createThumb = array;
					})
				} else {
					_this.imageResizer(data[key], thumbnails);
				}
			}
		}
	};
	if(createThumb > 0){
		sequence(createThumb)
		.then(function(){
			callback()
		})
	} else {
		callback()
	}
};

Multipart.prototype.imageResizer = function(image, options, callback){
	if(options.synchronous){
		im = Promise.promisifyAll(require('imagemagick'));
		var array = [];
	};
	var _this = this;
	var arrNameFile = image.split('.');
	var ext = arrNameFile[arrNameFile.length-1];
	var nameFile = "";
	if(arrNameFile.length > 2){
		for(var i in arrNameFile){
			if(i != arrNameFile.length-1){
				nameFile = nameFile + "."
			}
		}	
	} else {
		nameFile = arrNameFile[0];
	};
	var newFilename = nameFile + "_" + options.width.toString() +  "x" + options.height.toString() + "." + ext ;
	if(options.synchronous){
		array.push(function(){
			return im.resizeAsync({
				srcPath: _this._uploadDir + "/" + image,
				dstPath: _this._uploadDir + "/" + newFilename,
				width:   options.width,
				height: options.height,
				quality: 1 || options.quality,
				format: ext
			})
		})
		callback(array);
	} else {
		im.resize({
			srcPath: _this._uploadDir + "/" + image,
			dstPath: _this._uploadDir + "/" + newFilename,
			width:   options.width,
			height: options.height,
			quality: 1 || options.quality,
			format: ext
		}, function(err, stdout, stderr){
			if (err) throw err;
			console.log('resized')
		})
	}
};

module.exports = Multipart;