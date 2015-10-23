var bookshelf = require('./../models').bookshelf;
var Promise = require('bluebird');
var Post = require('./post.js');

var User = bookshelf.Model.extend({
	tableName : 'users',
	post : function(){
		return this.hasMany('Post');
	}
}, {
	save : Promise.method(function(data){
		console.log('-------------------------------');
		console.log(data !== null);
		if(data !== null){
			return new this(data).save()};
		}),
	check : Promise.method(function(email){
		return new this({email : email, is_active : 1}).fetch();
	}),
	list : Promise.method(function(queryBuilder){
		var that = this;
		var result = {};
		return this.collection()
		.query(function(qb){
			queryBuilder.build(qb)
		})
		.fetch()
		.then(function(listModel){
			result.data = listModel.toJSON();
			var raw = 'count(distinct(users.id)) as total';
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
	single : Promise.method(function(userId){
		return new this({id: userId}).fetch();
	}),
	update : Promise.method(function(data){
		console.log("++++++++++++++++++++++++++");
		console.log(data);
		return new this({id: data.id}).save(data);
	}),
	delete : Promise.method(function(data){
		console.log(data);
		return new this({id:data.id}).save(data)
	})
})

module.exports = bookshelf.model('User', User);