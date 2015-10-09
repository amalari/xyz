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
	}),
	list : Promise.method(function(){
		return this.collection().fetch();
	}),
	single : Promise.method(function(userId){
		return new this({id: userId}).fetch();
	}),
	update : Promise.method(function(data){
		return new this({id: data.id}).fetch(data);
	})
})

module.exports = bookshelf.model('User', User);