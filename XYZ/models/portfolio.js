var bookshelf = require('./../models').bookshelf;
var Promise = require('bluebird');
var Portfolio_Image = require('./portfolioImage');

var Portfolio = bookshelf.Model.extend({
	tableName : 'portfolios',
	portfolioImage : function(){
		return this.hasMany('Portfolio_Image')
	}
}, {
	list : Promise.method(function(queryBuilder){
		console.log("masuk ke list portfolio");
		var that = this;
		var result = {};
		return this.collection().query(function(qb){
			queryBuilder.build(qb)
		})
		.fetch({withRelated : ['portfolioImage']})
		.then(function(listModel){
			result.data = listModel.toJSON();
			var raw = 'count(distinct(portfolios.id)) as total';
			return that.collection()
			.query(function(qb){
				qb.select(bookshelf.knex.raw(raw));
				queryBuilder.buildConditionsOnly(qb);
			})
			.fetchOne();
		})
		.then(function(model){
			result.total = model.toJSON().total;
			return Promise.resolve(result);
		})
	}),
	single : Promise.method(function(portfolioId){
		return new this({id: portfolioId})
		.fetch({withRelated : ['portfolioImage']});
	}),
	save : Promise.method(function(portfolio){
		return new this(portfolio).save();
	}),
	update : Promise.method(function(portfolio){
		return new this({id: portfolio.id}).save(portfolio);
	}),
	delete : Promise.method(function(portfolioId){
		return new this({id: portfolioId}).destroy();
	})
})

module.exports = bookshelf.model('Portfolio', Portfolio);