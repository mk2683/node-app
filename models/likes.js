var mongoose = require("mongoose");

var likeSchema = new mongoose.Schema({
	postId: {
		type : String,
	},

	likesCount: {
		type: Number,
		default : 0
	},

	likeBy: {
		type: String,
		default : null
	},

	likeUserAvatarPath: {
		type: String,
		trim: true,
		default : null
	}
});


var Like = mongoose.model("Like", likeSchema);

module.exports = {
	Like
}