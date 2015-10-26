var bookshelf = require('./../models').bookshelf;
var Promise = require('bluebird');
var Portfolio = require('./portfolio.js');

var Portfolio_Image = bookshelf.Model.extend({
	tableName : 'portfolio_image',
	portfolio : function(){
		return this.belongsTo('Portfolio', 'portfolio_id')
	}
}, {
	save : Promise.method(function(images){
		var Images = bookshelf.Collection.extend({
			model : this
		});
		var portfolio_images = Images.forge(images)
		return Promise.all(portfolio_images.invoke('save'))
	}),
	list : Promise.method(function(queryBuilder){
		return this.collection()
		.query(function(qb){
			queryBuilder.buildConditionsOnly(qb)
		})
		.fetch({withRelated : ['portfolio']})
	})
})

module.exports = bookshelf.model('Portfolio_Image', Portfolio_Image);

