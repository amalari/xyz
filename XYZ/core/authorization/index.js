function Authorization(){};

// roles harus diisi array user yang bisa mengakses page tersebut
Authorization.prototype.required = function(roles){
	return function(req, res, next){
		if(roles.indexOf(req.user.title) > -1){
			return next()
		}else {
			if(req.xhr){
				res.send(403, {message : 'You cannot access this page'})
			} else {
				res.render('#') //isi # dengan page yang disiapkan untuk access forbidden
			}
		}
	}
};

module.exports = new Authorization();