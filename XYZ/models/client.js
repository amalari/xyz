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
		return new this({veify : varificationCode}).fetch()
	})
});

module.exports = bookshelf.model('Client', Client);