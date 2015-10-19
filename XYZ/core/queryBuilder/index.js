function queryBuilder(){
	this._limit = 10;
	this._offset = 0;
	this._whereCondition = {};

};

queryBuilder.prototype.setup = function(options){
	this._limit = options.limit || this._limit;
	this._offset = options.page? (parseInt(options.page)-1)*this._limit : this._offset;
	this._whereCondition = options.whereCondition || this._whereCondition;
};

queryBuilder.prototype.build = function(qb){
	return qb.limit(this._limit).offset(this._offset).where(this._whereCondition);
};
queryBuilder.prototype.buildConditionsOnly = function(qb){
	console.log("build condition only");
	return qb.where(this._whereCondition);
};

module.exports = queryBuilder;