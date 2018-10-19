var mongoose = require("mongoose");

var profileSchema = new mongoose.Schema({
	firstName : {
		type : String,
		required : true,
		minlength : 1,
		trim : true
	},

	lastName : {
		type : String,
		required : true,
		minlength : 1
	},

	designation : {
		type : String,
		required : true,
		minlength : 3
	},

	hospitalName : {
		type : String,
		required : true
	},

	city : {
		type : String,
		required : true
	},

	country : {
		type : String,
		required : true
	},

	avatarPath: {
		type: String,
		required: true,
		trim: true
	},

	avatarName: {
		type: String,
		required: true
	},

	user: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "User"
    }
});


var Profile = mongoose.model("Profile", profileSchema);

module.exports = {
	Profile
}