var bookshelf = require('./../models').bookshelf;
var Promise = require('bluebird');
var User = require('./user.js');
// var qb = require('./../core/queryBuilder/index.js');

var Post = bookshelf.Model.extend({
	tableName : 'posts',
	user : function(){
		return this.belongsTo('User', 'user_id')
	},
	category : function(){
		return this.belongsTO('Category', 'category_id')
	}
}, {
	save : Promise.method(function(posting){
		return new this(posting).save();
	}),
	list : Promise.method(function(queryBuilder){
		var result = {};
		return this.collection().query(function(qb){
			queryBuilder.build(qb)
		})
		.fetch({withRelated : ['user', 'category']})
		.then(function(listModel){
			result.data = listModel.toJSON();
			var raw = 'count(distinct(posts.id)) as total';
			return this.collection()
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
	single : Promise.method(function(postingId){
		return new this({id: postingId}).fetch({withRelated : ['user', 'category']});
	}),
	update : Promise.method(function(posting){
		return new this({id: posting.id}).save(posting);
	})
})

module.exports = bookshelf.model('Post', Post);