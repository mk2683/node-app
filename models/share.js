var mongoose = require("mongoose");

var shareSchema = new mongoose.Schema({
	shareText : {
		type : String,
	},

	shareImagePath: {
		type: String,
		trim: true,
		default : null
	},

	shareImageName: {
		type: String,
		default : null
	},

	shareVideoPath: {
		type: String,
		trim: true,
		default : null
	},

	shareVideoName: {
		type: String,
		default : null
	},

	sharePrivacy : {
		type : Number,
		default : 1
	},

	updatedOn: {
		type: Date,
		default: Date.now()
	},

	postId : {
		type: mongoose.Schema.Types.ObjectId,
    	ref: "Post"
	},

	shareBy : {
		type: mongoose.Schema.Types.ObjectId,
    	ref: "User"
	}
});


var Share = mongoose.model("Share", ShareSchema);

module.exports = {
	Share
}