viewModels.prototype.map = function(data, add, decr){
	var that = this;
	if(Array.isArray(data)){
		this._properties = data.map(function(list){
			for(var i in that._properties){
				that._result[that._properties[i]] = list[that]
			}
		})
};