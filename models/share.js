var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
	postText : {
		type : String,
	},

	imagePath: {
		type: String,
		trim: true,
		default : null
	},

	imageName: {
		type: String,
		default : null
	},

	videoPath: {
		type: String,
		trim: true,
		default : null
	},

	videoName: {
		type: String,
		default : null
	},

	privacy : {
		type : Number,
		default : 1
	},

	updatedOn: {
		type: Date,
		default: Date.now()
	},

	postBy : {
		type: mongoose.Schema.Types.ObjectId,
    	ref: "User"
	}
});


var Post = mongoose.model("Post", postSchema);

module.exports = {
	Post
}