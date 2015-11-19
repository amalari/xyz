var util = require('util');
var QueryBuilder = require('./index.js');

function SearchQueryBuilder(){
	//the memeber of search condition should be an array
	this._searchCondition = [];
}
util.inherits(SearchQueryBuilder, QueryBuilder);

SearchQueryBuilder.prototype.build = function(qb){
	var modifiedQb = SearchQueryBuilder.super_.prototype.build.call(this,qb);
	return this._extractSearchCondition(modifiedQb);
};
SearchQueryBuilder.prototype.buildConditionsOnly = function(qb){
	var modifiedQb = SearchQueryBuilder.super_.prototype.buildConditionsOnly.call(this,qb);
	return this._extractSearchCondition(modifiedQb);
};

SearchQueryBuilder.prototype._extractSearchCondition = function(modifiedQb){
	var looping = 0;
	var condition = [];
	var id = 0;
	var x = {};
	for(var i in this._searchCondition){
		if(i == 0){
			modifiedQb = modifiedQb.where(this._searchCondition[i][0],this._searchCondition[i][1],this._searchCondition[i][2])
		}else{
			for(var a in this._searchCondition[i]){
				for(var b in this._searchCondition[i][a]){
					looping++
				}
			};
			if(looping >= 2 && this._whereCondition.type == 2){
				for(var a in this._searchCondition[i]){
					for(var b in this._searchCondition[i][a]){
						x.id = {};
						x.id[b] = this._searchCondition[i][a][b];
						condition.push(x.id);
						id++
					}
				}
				modifiedQb = modifiedQb.orWhere(condition[0]).andWhere(condition[1], condition[2]);
			} else {
				modifiedQb = modifiedQb.orWhere(this._searchCondition[i][0],this._searchCondition[i][1],this._searchCondition[i][2]);
			}
		}	
	}
	id = 0
	return modifiedQb;
};

SearchQueryBuilder.prototype.search = function(params){
	this._searchCondition.push(params);
};


module.exports = SearchQueryBuilder;