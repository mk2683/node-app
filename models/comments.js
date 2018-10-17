var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
	postId: {
		type : String
	},

	commentText: {
		type: String
	},

	commentCount: {
		type: Number,
		default : 0
	},

	commentUserName: {
		type: String,
		default : null
	},

	commentUserAvatarPath: {
		type: String,
		trim: true,
		default : null
	}
});


var Comment = mongoose.model("Comment", commentSchema);

module.exports = {
	Comment
}