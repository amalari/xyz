var bookshelf = require('./../models').bookshelf;
var Promise = require('bluebird');
var Post = require('./post.js');
var Portfolio = require('./portfolio');

var Category = bookshelf.Model.extend({
	tableName : 'categories',
	posts : function(){
		return this.hasMany('Post');
	},
	portfolios : function(){
		return this.hasMany('Portfolio');
	}
},{
	save : Promise.method(function(data){
		return new this({id: data.id}).save(data)
	}),
	getList : Promise.method(function(queryBuilder){
		var that = this;
		var result = {};
		return this.collection()
		.query(function(qb){
			queryBuilder.build(qb)
		})
		.fetch({withRelated : ["posts", "portfolios"]})
		.then(function(listModel){
			result.data = listModel.toJSON();
			var raw = 'count(distinct(categories.id)) as total';
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
	get: Promise.method(function(categoryId){
		return new this({id : categoryId}).fetch()
	})
});

module.exports = bookshelf.model('Category', Category);