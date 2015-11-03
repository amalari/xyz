var bookshelf = require('./../models').bookshelf;
var Promise = require('bluebird');
var User = require('./user.js');
var Category = require('./category.js');
var Comment = require('./comment.js');
// var qb = require('./../core/queryBuilder/index.js');

var Post = bookshelf.Model.extend({
	tableName : 'posts',
	user : function(){
		return this.belongsTo('User', 'user_id')
	},
	category : function(){
		return this.belongsTo('Category', 'category_id')
	},
	comments : function(){
		return this.hasMany('Comment')
	},
	rootComments : function(){
        return this.comments().query('where', 'parrent_id', null);
	},
}, {
	save : Promise.method(function(posting){
		return new this(posting).save();
	}),
	list : Promise.method(function(queryBuilder){
		console.log("post list model");
		var that = this;
		var result = {};
		return this.collection().query(function(qb){
			queryBuilder.build(qb)
		})
		.fetch({withRelated : ['user', 'category', 'comments']})
		.then(function(listModel){
			console.log("list Model :");
			result.data = listModel.toJSON();
			var raw = 'count(distinct(posts.id)) as total';
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
	single : Promise.method(function(postingId, params, reqAjax){
		if(reqAjax || params === 1){
			return new this({id: postingId}).fetch({withRelated : ['user', 'category', 'comments']});
		} else { 
			return new this({type : params}).fetch({withRelated : ['user', 'category', 'comments']});
		}
	}),
	update : Promise.method(function(posting){
		return new this({id: posting.id}).save(posting);
	}),
	delete : Promise.method(function(postingId){
		return new this({id: postingId}).destroy();
	})
})

module.exports = bookshelf.model('Post', Post);