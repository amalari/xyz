var fs = require('fs');
var path = require('path');

TinyvisonController = {
	registerRoutes : function(app){
		console.log('masuk tinyvison');
		app.get('/list/image', this.list);
	},
	list : function(req, res){
		var result = {};
		result.data = [];
		console.log("masuk sini ga?");
		fs.readdir('public/images', function(err, files){
			var obj = {};
			console.log(files);
			var x = '/images/' + files[0];
			var y = '/images/' + files[1];
			var z = files[1];
			obj.imageUrl = x;
			obj.name = z;
			obj.value = y
			result.data.push(obj);
			res.json(result);
		})
	}
};

module.exports = TinyvisonController;