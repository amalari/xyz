function viewModels(){
	this._properties = [];
	this._result = {};
};

viewModels.prototype.setup = function(data){
	if(Array.isArray(data)){
		var x = data[0];
		for(var y in x){
			this._properties.push(y);
		}
	} else {
		for(var i in data){
			this._properties.push(x);
		}
	}
};

viewModels.prototype.map = function(data, add, decr){
	if(Array.isArray(data)){
		for(var i in this._properties){
			this._result[this._properties[i]] = data[this._properties[i]];
		}
		var result = data.map(function(list){
			return this._result;	
		})
		return result;
	};
	if(decr){
		console.log("decr");
		// var result1 = {};
		for(var i in decr){
			var x = this._properties.indexOf(decr[i]);
			var arr1 = this._properties.splice(x,1)
		}
		for(var a in arr){
			this._result[arr1[a]] = data[arr[a]];
		}
		return this._result;
	};
	if(add){
		console.log("add");
		// var result2 = {};
		for(var b in add){
			data[b] = add[b];
			var arr2 = this._properties.push(b);
		}
		for(var c in arr2){
			this._result[arr2[c]] = data[arr2[c]];
		}
		return this._result;
	};
	if(!decr && !add){
		// var result = {};
		for(var i in this._properties){
			this._result[this._properties[i]] = data[this._properties[i]];
		}
		return this._result;
	};
};

module.exports = viewModels;