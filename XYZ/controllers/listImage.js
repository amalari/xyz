var fs = require('fs');
var path = require('path');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');
var sequence = require('when/sequence');
var Promise = require('bluebird');
var im = Promise.promisifyAll(require('imagemagick'));

TinyvisonController = {
	registerRoutes : function(app){
		app.get('/image', this.list);
		app.post('/image', this.post);
	},
	list : function(req, res){
		var result = {};
		result.data = [];
		fs.readdir('public/images', function(err, files){
			files.forEach(function(val, i){
				var obj = {};
				var deleteExt = val.split('.');
				deleteExt.splice(deleteExt.length-1, 1);
				var newFilename = deleteExt.toString() + "_300x300.JPG";
				obj.imageUrl = '/images/' + newFilename;
				obj.name = val;
				obj.value = '/images/' + val;
				if(val.indexOf("300x300") === -1){
					result.data.push(obj);
				};
				console.log(result.data);
			})
			res.json(result);
		})
	},
	post : function(req, res){
		var formMultipart = new Multipart({
			uploadDir : __dirname + '/../public/images/',
			allowedMimeTypes : ['image/jpeg', 'image/png', 'image/gif' ],
			thumbnail : true
		});
		var formFileManager = new FileManager({
			dir : __dirname + '/../public/images',
			baseUrl : '/images'
		});
		formMultipart.parseAndSaveFiles(req, function(data){
			var newData = {};
			newData.client_id = req.query.clientId;
			var dataFilters = [];
			for(var key in data){
				if(key.indexOf("file") > -1){
					dataFilters.push(function () {
						newData[key] = formFileManager.getUrl(data[key])
						var deleteExt = newData[key].split('.');
						deleteExt.splice(deleteExt.length - 1, 1);
						var newFilename = deleteExt.toString() + "_300x300.JPG";
						return im.resizeAsync({
							srcPath: __dirname + '/../public' + newData[key],
							dstPath: __dirname + '/../public' + newFilename,
							width:   300,
							height: 300,
							quality: 1,
							format: 'jpg'
						});
					});
				} else {
					newData[key] = data[key];
				}
			};
			sequence(dataFilters)
			.then(function () {
				res.send({success:true});
			})
			
		})
	}
};

module.exports = TinyvisonController;