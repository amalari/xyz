function viewModels(){};

viewModels.prototype.map = function(array, data){
	var result = {};
	for(var i in array){
		result[array[i]] = data[array[i]];
	}
	return result;
};

module.exports =  viewModels;