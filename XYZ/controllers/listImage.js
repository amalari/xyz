var fs = require('fs');
var path = require('path');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');
var sequence = require('when/sequence');

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
				var ext = deleteExt.splice(deleteExt.length-1, 1);
				var newFilename = deleteExt.toString() + "_300x300." + ext;
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
		var thumbnails = {
			synchronous : true,
			height : 300,
			width : 300,
			quality : 1
		};
		var createThumb = [];
		formMultipart.parseAndSaveFiles(req, function(data){
			if(thumbnails.synchronous){
				formMultipart.imageResizer(data.files, thumbnails, function(array){
					createThumb = array;
				});
			} else {
				formMultipart.imageResizer(data.files, thumbnails)
			};
			sequence(createThumb)
			.then(function(){
				res.send({success:true});
			})
		})
	}
};

module.exports = TinyvisonController;