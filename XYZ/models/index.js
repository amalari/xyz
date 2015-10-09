var bookshelf = require('bookshelf');

function Bookshelf(){
	var knex = require('knex')({
		client: 'mysql',
		connection: {
			host     : '127.0.0.1',
			user     : 'root',
			password : '',
			database : 'xyzdb',
			charset  : 'utf8',
			debug: ['ComQueryPacket']
		}
	});
	this.bookshelf = bookshelf(knex);
	this.bookshelf.plugin('registry');
}

module.exports = new Bookshelf();