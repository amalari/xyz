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
			orderBy : "DESC",
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
			res.send(PortfolioViewModel.get(data, req.xhr))
		})
	},
	save : function(req, res){
		portfolioMultipart.parseAndSaveFiles(req, 
		{
			synchronous : false,
			thumbnails : {
				fieldname : "header",
				height : 400,
				width : 400,
				quality : 1
			}
		}, function(data){
			var newData = {};
			var arr = [];
			for(var key in data){
				if(key.indexOf("image") === -1){
					if(key === "header"){
						if(data[key] != undefined){
							newData.header_image = portfolioFileManager.getUrl(data[key]);
						}
					}
					newData[key] = data[key];
				} 
			};
			var result = PortfolioViewModel.save(newData);
			Portfolio.save(result)
			.then(function(model){
				var singleData = model.toJSON();
				for(var key in data){
					if(key.indexOf("image") > -1){
						if(data[key] != undefined){
							var imageDir = portfolioFileManager.getUrl(data[key]);
							image_maping(imageDir, singleData.id, arr);
						}
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
	portfolioMultipart.parseAndSaveFiles(req, {
		synchronous : false,
		thumbnails : {
			fieldname : "header",
			height : 400,
			width : 400,
			quality : 1
		}
	}, function(data){
		Portfolio.single(data.id)
		.then(function(model){
			var singleData = model.toJSON();
			if(singleData.header_image && data.header != undefined){
				var newFileName = portfolioFileManager.addCharBeforeExt(singleData.header_image, "400x400");
				portfolioFileManager.delete(newFileName);
				portfolioFileManager.delete(singleData.header_image);
			};
			if(data.header != undefined){
				data.header_image = portfolioFileManager.getUrl(data.header);
			} else {
				data.header_image = singleData.header_image;
			};
			var result = PortfolioViewModel.update(data);
			return Portfolio.update(result);
		})
		.then(function(){
			if(data.image != undefined || data.image_0 != undefined){
				var queryBuilder = new qb();
				queryBuilder.setup({
					whereCondition : {portfolio_id : data.id}
				});
				return PortfolioImage.list(queryBuilder)
			} else {
				return res.send({success : true})
			};
		})
		.then(function(listModel){
			if(listModel !== null){
				var list_images = listModel.toJSON();
				for(var i in list_images){
					portfolioFileManager.delete(list_images[i].image);	
				};
				return PortfolioImage.delete(list_images)
			} else {
				return;
			}
		})
		.then(function(model){
			console.log(model.toJSON());
			var arr = [];
			for(var key in data){
				if(key.indexOf("image") > -1){
					if(key.indexOf("header") < 0){
						if(data[key] != undefined){
							var imageDir = portfolioFileManager.getUrl(data[key]);
							image_maping(imageDir, data.id, arr);
						}
					}	
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
delete : function(req, res){
	Portfolio.single(req.params.id)
	.then(function(model){
		var portfolio = model.toJSON();
		if(portfolio.header_image != null){
			var newFileName = portfolioFileManager.addCharBeforeExt(portfolio.header_image, "400x400");
			portfolioFileManager.delete(newFileName);
			portfolioFileManager.delete(portfolio.header_image);
		};
		return Portfolio.delete(req.params.id)
	})
	.then(function(){
		var queryBuilder = new qb();
		queryBuilder.setup({
			whereCondition : {portfolio_id : req.params.id}
		});
		return PortfolioImage.list(queryBuilder)
	})
	.then(function(listModel){
		var list_images = listModel.toJSON();
		for(var i in list_images){
			if(list_images[i].image != null){
				portfolioFileManager.delete(list_images[i].image);
			}
		};
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