var bookshelf = require('./../models').bookshelf;
var Promise = require('bluebird');
var ProjectRequest = require('./projectRequest.js');

var Client = bookshelf.Model.extend({
	tableName : 'clients',
	projectRequest : function(){
		return this.hasMany('ProjectRequest')
	}
})

module.exports = bookshelf.model('Client', Client);