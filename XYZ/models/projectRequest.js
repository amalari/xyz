var bookshelf = require('./../models').bookshelf;
var Promise = require('bluebird');
var Client = require('./client.js');

var ProjectRequest = bookshelf.Model.extend({
	tableName : 'projects',
	client : function(){
		return this.belongsTo('Client','client_id')
	}
}, {
	list : Promise.method(function(queryBuilder){
		var that = this;
		var result = {};
		return this.collection().query(function(qb){
			queryBuilder.build(qb)
		})
		.fetch({withRelated : ['client']})
		.then(function(listModel){
			result.data = listModel.toJSON();
			var raw = 'count(distinct(projects.id)) as total';
			return that.collection()
			.query(function(qb){
				qb.select(bookshelf.knex.raw(raw));
			})
			.fetchOne()
		})
		.then(function(model){
			result.total = model.toJSON().total;
			return Promise.resolve(result);
		})
	}),
	single : Promise.method(function(projectId){
		return new this({id:projectId}).fetch({withRelated : ['client']});
	}),
	save : Promise.method(function(project){
		return new this(project).save();
	})
});

module.exports = bookshelf.model('ProjectRequest', ProjectRequest);