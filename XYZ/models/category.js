var bookshelf = require('./../models').bookshelf;
var Promise = require('bluebird');
var Post = require('./post.js');

var Category = bookshelf.Model.extend({
	tableName : 'categories',
	post : function(){
		return this.hasMany('Post');
	}
},{
	save : Promise.method(function(data){
		return new this(data).save()
	})
});

module.exports = bookshelf.model('Category', Category);