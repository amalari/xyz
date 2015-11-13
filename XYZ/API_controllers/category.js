var Category = require('./../models/category.js');
var qb = require('./../core/queryBuilder/index.js');
// var testAccount = require('./../tests/account.js');


CategoryController = {
	registerRoutes : function(app){
		app.get('/api/category', this.list);
		app.get('/api/category/:id', this.get);
		app.post('/api/category', this.save);
		app.put('/api/category/:id', this.save);
	},
	save : function(req, res){
		var data = {};
		data.name = req.body.name;
		data.id = req.body.categoryId;
		data.is_active = req.body.is_active;
		console.log(data);
		Category.save(data)
		.then(function(){
			res.send({success: true})
		})
		.catch(function(err){
			res.send({success: false, message: err.message})
		})
	},
	list : function(req, res){
		var queryBuilder = new qb();
		queryBuilder.setup({
			limit : 100,
			whereCondition : {is_active : 1}
		});
		Category.getList(queryBuilder)
		.then(function(list){
			res.send(list);
		})
	},
	get : function(req, res){
		Category.get(req.params.id)
		.then(function(data){
			res.send(data)
		})
		.catch(function(err){
			res.send({success : false, message : err.message})
		})
	}
}

module.exports = CategoryController;