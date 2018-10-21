var mongoose = require("mongoose");
var validator = require("validator");
var jwt = require("jsonwebtoken");
var _ = require("lodash");
var bcrypt = require("bcryptjs");


var userSchema = new mongoose.Schema({
	email : {
		type : String,
		required : true,
		minlength : 1,
		trim : true,
		unique : true,
		validate : {
			validator : validator.isEmail,
			message : '{VALUE} is not a valid Email'
		}
	},

	password : {
		type : String,
		required : true,
		minlength : 6,
	},

	tokens : [{
		access : {
			type : String,
			required : true
		},
		token : {
			type : String,
			required : true
		}
	}],

	resetPasswordToken: String,

    resetPasswordExpires: Date,

    userName: String,

    designation: String,

    avatarPath: String

    // profile: {
	//     type: mongoose.Schema.Types.ObjectId,
	//     ref: "Profile"
	// }

})

userSchema.methods.toJSON = function (){
	var user = this;
	var userObject = user.toObject();
	return _.pick(userObject, ["_id", "email"]);
}

userSchema.methods.generateAuthToken = function() {
	var user = this;
	var access = "auth";
	var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

	user.tokens.push({access, token});

	return user.save().then(() => {
		return token;
	});
}

userSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

userSchema.statics.findByToken = function (token) {
	var User = this;
	var decode;

	try {
		decode = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		return Promise.reject();
	}

	return User.findOne({
		_id : decode._id,
		"tokens.token" : token,
		"tokens.access" : "auth"
	})
}

userSchema.pre("save", function(next){
	var user = this;

	if (user.isModified("password")) {
		var password = user.password;
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
})

//comparePassword
userSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    // return a promise because bcrypt returns a callback
    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

var User = mongoose.model("User", userSchema);

module.exports = {
	User
}
