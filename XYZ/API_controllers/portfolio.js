var Portfolio = require('./../models/portfolio.js');
var PortfolioImage = require('./../models/portfolioImage.js');
var qb = require('./../core/queryBuilder/index.js');
var PortfolioViewModel = require('./../viewModels/portfolio.js');
var Multipart = require('./../core/multipart/index.js');
var FileManager = require('./../core/file-manager/index.js');

var portfolioMultipart = new Multipart({
	uploadDir : __dirname + '/../public/uploads/portfolio',
	allowedMimeTypes : ['image/jpeg', 'image/png', 'image/gif' ]
});

var portfolioFileManager = new FileManager({
	dir : __dirname + '/../public/uploads/portfolio',
	baseUrl : '/uploads/portfolio'
});
var image_maping = function(data, portfolioId, arr){
	var y = {};
	y.image = data;
	y.portfolio_id = portfolioId;
	arr.push(y);
};

PortfolioController = {
	registerRoutes : function(app){
		console.log("controller portfolio")
		app.get('/api/portfolio', this.list);
		app.get('/api/portfolio/:id', this.single);
		app.post('/api/portfolio', this.save);
		app.put('/api/portfolio/:id', this.update);
		app.delete('/api/portfolio/:id', this.delete);
	},
	list : function(req, res){
		var queryBuilder = new qb();
		queryBuilder.setup({
			limit : req.query.limit,
			page : req.query.page,
			whereCondition : {is_active : req.query.is_active}
		});
		Portfolio.list(queryBuilder)
		.then(function(list){
			res.send(list);
		})
		.catch(function(err){
			res.send(err.message)
		})
	},
	single : function(req, res){
		Portfolio.single(req.params.id)
		.then(function(model){
			var data = model.toJSON();
			res.send(PortfolioViewModel.get(data))
		})
	},
	save : function(req, res){
		portfolioMultipart.parseAndSaveFiles(req, function(data){
			console.log(data);
			var newData = {};
			var arr = [];
			for(var key in data){
				if(key.indexOf("image") === -1){
					if(key === "header"){
						newData.header_image = portfolioFileManager.getUrl(data[key]);
					}
					newData[key] = data[key];
				} 
			};
			var result = PortfolioViewModel.save(newData);
			Portfolio.save(result)
			.then(function(model){
				var singleData = model.toJSON();
				console.log(singleData);
				for(var key in data){
					if(key.indexOf("image") > -1){
						var imageDir = portfolioFileManager.getUrl(data[key]);
						image_maping(imageDir, singleData.id, arr);
					}
				};
				return PortfolioImage.save(arr);
			})
			.then(function(){
				res.send({success : true})
			})
			.catch(function(err){
				res.send({success : false, message : err.message})
			})
		})
	},
	update : function(req, res){
		portfolioMultipart.parseAndSaveFiles(req, function(data){
			Portfolio.single(data.id)
			.then(function(model){
				var singleData = model.toJSON();
				if(singleData.header_image){
					portfolioFileManager.delete(singleData.header_image);
					data.header_image = portfolioFileManager.getUrl(data.header);
				};
				var result = PortfolioViewModel.update(data);
				return Portfolio.update(result);
			})
			.then(function(){
				var queryBuilder = new qb();
				queryBuilder.setup({
					whereCondition : {portfolio_id : data.id}
				});
				return PortfolioImage.list(queryBuilder)
			})
			.then(function(listModel){
				var arr = [];
				if(listModel !== null){
					var list_images = listModel.toJSON();
					portfolio_id = list_images.id;
					console.log(list_images);
					for(var i in list_images){
						portfolioFileManager.delete(list_images[i].image);
					};
				};
				for(var key in data){
					if(key.indexOf("image") > -1){
						var imageDir = portfolioFileManager.getUrl(data[key]);
						image_maping(imageDir, data.id, arr);
					}
				};
				console.log(arr);
				return PortfolioImage.save(arr);
			})
			.then(function(){
				res.send({success : true})
			})
			.catch(function(err){
				res.send({success : false, message : err.message})
			})
		})
	},
	delete : function(req, res){
		Portfolio.single(req.params.id)
		.then(function(model){
			var portfolio = model.toJSON();
			portfolioFileManager.delete(portfolio.header_image);
			return Portfolio.delete(req.params.id)
		})
		.then(function(){
			console.log(portfolio);
			var queryBuilder = new qb();
			queryBuilder.setup({
				whereCondition : {portfolio_id : req.params.id}
			});
			return PortfolioImage.list(queryBuilder)
		})
		.then(function(listModel){
			var list_images = listModel.toJSON();
			for(var i in list_images){
				portfolioFileManager.delete(list_images[i].image)
			}
			return PortfolioImage.delete(list_images)
		})
		.then(function(){
			res.send({success : true})
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	}
}

module.exports = PortfolioController;