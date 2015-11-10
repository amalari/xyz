var handlebars = require('express-handlebars');
var paginateHelper = require('express-handlebars-paginate');

//set what type of file that will use in handlebars
function hbs(extFormat, layoutName, app){
	this._extFormat = extFormat;
	this._handlebars = null;
	this._layoutName = layoutName;
	this._app = app;
};

hbs.prototype.init = function(){
	this._handlebars = handlebars.create({
		extname : this._extFormat,
		defaultLayout : this._layoutName,
		helpers: {
			section: function(name, options){
				if(!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
		} 
	});
};

hbs.prototype.pagination = function(){
	return this._handlebars.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);
};

hbs.prototype.set = function(){
	this._app.engine(this._extFormat, this._handlebars.engine);
	this._app.set('view engine', this._extFormat);
};

module.exports = hbs;