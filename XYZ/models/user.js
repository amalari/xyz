var bookshelf = require('./../models').bookshelf;
var Promise = require('bluebird');

var User = bookshelf.Model.extend({
	tableName : 'users'
}, {
	save : Promise.method(function(data){
		console.log(data !== null);
		if(data !== null){
		return new this(data).save()};
	}),
	check : Promise.method(function(email){
		return new this({email : email}).fetch();
	})
})

module.exports = bookshelf.model('User', User);