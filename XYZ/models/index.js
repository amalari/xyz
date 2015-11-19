var bookshelf = require('bookshelf');
var config = require('./../config');

function Bookshelf(){
	var knex = require('knex')(config.database);
	this.bookshelf = bookshelf(knex);
	this.bookshelf.plugin('registry');
}

module.exports = new Bookshelf();