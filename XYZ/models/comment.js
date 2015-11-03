var bookshelf = require('./../models').bookshelf;
var Promise = require('bluebird');
var Post = require('./post.js');
var Portfolio = require('./portfolio.js');


var Comment = bookshelf.Model.extend({
	tableName : 'comments',
	post : function(){
		return this.belongsTo('Post', 'post_id')
	},
	portfolio : function(){
		return this.belongsTo('Portfolio', 'portfolio_id')
	},
	
	comments : function(){
		return this.hasMany('Comment', 'parrent_id')
	},
	parrent_comment: function(){
		return this.belongsTo('Comment', 'parrent_id')
	}
}, {
	save : Promise.method(function(comment){
		return new this(comment).save();
	}),
	list : Promise.method(function(queryBuilder){
		var that = this;
		var result = {};
		return this.collection().query(function(qb){
			queryBuilder.build(qb)
		})
		.fetch({withRelated : ['post', 'portfolio', 'comments', 'parrent_comment']})
		.then(function(listModel){
			result.data = listModel.toJSON();
			var raw = 'count(distinct(comments.id)) as total';
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
	delete : Promise.method(function(comment){
		return new this({id: comment.id}).save(comment);
	})
})

module.exports = bookshelf.model('Comment', Comment);