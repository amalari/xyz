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
	var modifiedQb = qb.limit(this._limit).offset(this._offset);
	if(!this._isEmpty(this._whereCondition)){
		modifiedQb = modifiedQb.where(this._whereCondition);
	}
	return modifiedQb;
	// return .where(this._whereCondition);
};
queryBuilder.prototype.buildConditionsOnly = function(qb){
	console.log("build condition only");
	if(!this._isEmpty(this._whereCondition)){
		return qb.where(this._whereCondition);		
	}
	return qb;
};

queryBuilder.prototype._isEmpty = function (map) {
	for(var key in map) {
		if (map.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
}

module.exports = queryBuilder;