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
};

FileManager.prototype.deleteFolder = function(){
	var path = this._dir;
	if( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file,index){
			var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
      	deleteFolderRecursive(curPath);
      } else { // delete file
      	fs.unlinkSync(curPath);
      }
  });
		fs.rmdirSync(path);
	}
};

FileManager.prototype.addCharBeforeExt = function(fileFullPath, char){
	console.log(fileFullPath);
	console.log(char);
	var arrImageName = fileFullPath.split("/");
	var imageName = arrImageName[arrImageName.length-1];
	var arrImageWithoutExt = imageName.split(".");
	var ext = arrImageWithoutExt.splice(arrImageWithoutExt.length-1, 1);
	for(var a in arrImageWithoutExt){
		if(a > 0){
			name_image = name_image + "." + arrImageWithoutExt[a];
		} else {
			var name_image = arrImageWithoutExt[a]
		}
	};
	var newImageName = name_image + "_" + char + "." + ext;
	arrImageName.splice(arrImageName.length-1, 1, newImageName); 
	var dirNewImageName = arrImageName.toString().replace(/,/g , "/");
	return dirNewImageName;
};

module.exports = FileManager;