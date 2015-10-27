var bookshelf = require('./../models').bookshelf;
var Promise = require('bluebird');
var Portfolio = require('./portfolio.js');

var Portfolio_Image = bookshelf.Model.extend({
	tableName : 'portfolio_image',
	portfolio : function(){
		return this.belongsTo('Portfolio', 'portfolio_id')
	}
}, {
	save : Promise.method(function(array){
		var Images = bookshelf.Collection.extend({
			model : this
		});
		var portfolio_images = Images.forge(array)
		return Promise.all(portfolio_images.invoke('save'))
	}),
	list : Promise.method(function(queryBuilder){
		return this.collection()
		.query(function(qb){
			queryBuilder.buildConditionsOnly(qb)
		})
		.fetch({withRelated : ['portfolio']})
	}),
	delete : Promise.method(function(array){
		var Images = bookshelf.Collection.extend({
			model : this
		});
		var portfolio_images = Images.forge(array)
		return Promise.all(portfolio_images.invoke('destroy'))
	})
})

module.exports = bookshelf.model('Portfolio_Image', Portfolio_Image);

