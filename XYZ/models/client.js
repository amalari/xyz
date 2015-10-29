var bookshelf = require('./../models').bookshelf;
var Promise = require('bluebird');
var ProjectRequest = require('./projectRequest.js');

var Client = bookshelf.Model.extend({
	tableName : 'clients',
	projectRequest : function(){
		return this.hasMany('ProjectRequest')
	}
}, {
	save : Promise.method(function(client){
		return new this(client).save();
	}),
	update : Promise.method(function(client){
		return new this({id : client.id}).save(client)
	}),
	get : Promise.method(function(varificationCode){
		return new this({verify : varificationCode}).fetch()
	}),
	list : Promise.method(function(queryBuilder){
		return this.collection().query(function(qb){
			queryBuilder.buildConditionsOnly(qb);
		}).fetch()
	})
});

module.exports = bookshelf.model('Client', Client);