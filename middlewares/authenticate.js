var {User} = require("../models/user.js");

var authenticate = (req, res, next) => {
	var token = req.header("Authorization");
	User.findByToken(token).populate("profile").exec((err, user) => {
		if (err) {
			res.status(401).send();
		} else {
			if(!user){
				res.status(401).send();
			}
			req.user = user;
			req.token = token;
			next();
		}
	})
}

module.exports = {
	authenticate
}

// User.findByToken(token).then((user) => {
// 		if(!user){
// 			return Promise.reject();
// 		}
// 		req.user = user;
// 		req.token = token;
// 		next();
// 	}).catch((e) => {
// 		res.status(401).send();
// })
