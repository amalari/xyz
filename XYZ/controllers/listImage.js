var fs = require('fs');
var path = require('path');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');

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
		formMultipart.parseAndSaveFiles(req, {
			synchronous : true,
			thumbnails : {
				height : 300,
				width : 300,
				quality : 1
			}
		}, function(data){
			res.send({success:true});
			
		})
	}
};

module.exports = TinyvisonController;