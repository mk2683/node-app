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

	postById : {
		type: mongoose.Schema.Types.ObjectId,
    	ref: "User"
	},

	postBy : {
		type : String
	},

	userDesignation : {
		type : String
	},

	userAvatarPath: {
		type : String
	},

	likes : [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Like"
      }
    ],

	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});


var Post = mongoose.model("Post", postSchema);

module.exports = {
	Post
}

// likesCount : {
// 		type : Number,
// 		default :0
// 	},

// 	likesUsers : {
// 		type : String
// },