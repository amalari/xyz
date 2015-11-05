var util = require('util');
var QueryBuilder = require('./index.js');

function SearchQueryBuilder(){
	//the memeber of search condition should be an array
	this._searchCondition = [];
}
util.inherits(SearchQueryBuilder, QueryBuilder);

SearchQueryBuilder.prototype.build = function(qb){
	console.log('--------------------------------------------------------------');
	console.log(this);
	var modifiedQb = SearchQueryBuilder.super_.prototype.build.call(this,qb);
	// console.log(modifiedQb);
	return this._extractSearchCondition(modifiedQb);
};
SearchQueryBuilder.prototype.buildConditionsOnly = function(qb){
	var modifiedQb = SearchQueryBuilder.super_.prototype.buildConditionsOnly.call(this,qb);
	return this._extractSearchCondition(modifiedQb);
};

SearchQueryBuilder.prototype._extractSearchCondition = function(modifiedQb){
	for(var i in this._searchCondition){
		if(i == 0){
			modifiedQb = modifiedQb.where(this._searchCondition[i][0],this._searchCondition[i][1],this._searchCondition[i][2])
		}else{
			modifiedQb = modifiedQb.orWhere(this._searchCondition[i][0],this._searchCondition[i][1],this._searchCondition[i][2])
		}	
	}
	return modifiedQb;
};

SearchQueryBuilder.prototype.search = function(params){
	this._searchCondition.push(params);
};


module.exports = SearchQueryBuilder;