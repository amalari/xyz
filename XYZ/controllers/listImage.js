var fs = require('fs');
var path = require('path');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');

TinyvisonController = {
	registerRoutes : function(app){
		console.log('masuk tinyvison');
		app.get('/list/image', this.list);
		app.post('/list/image', this.post);
	},
	list : function(req, res){
		var result = {};
		result.data = [];
		console.log("masuk sini ga?");
		fs.readdir('public/images', function(err, files){
			files.forEach(function(val, i){
					var obj = {};
					obj.imageUrl = '/images/' + val;
					obj.name = val;
					obj.value = '/images/' + val;
					result.data.push(obj);
			})
			res.json(result);
		})
	},
	post : function(req, res){
		var formMultipart = new Multipart({
			uploadDir : __dirname + '/../public/images/',
			allowedMimeTypes : ['image/jpeg', 'image/png', 'image/gif' ]
		});
		var formFileManager = new FileManager({
			dir : __dirname + '/../public/images',
			baseUrl : '/images'
		});
		formMultipart.parseAndSaveFiles(req, function(data){
			// var newData = {};
			// newData.client_id = req.query.clientId;
			// for(var key in data){
			// 	if(key.indexOf("file") > -1){
			// 		newData[key] = formFileManager.getUrl(data[key])
			// 	} else {
			// 		newData[key] = data[key];
			// 	}
			// };
			// var result = ProjectRequestViewModel.save(newData);
			// ProjectRequest.save(result)
			// .then(function(){
			// 	res.render("finish-form")
			// })
			res.send({success:true});
		})
	}
};

module.exports = TinyvisonController;