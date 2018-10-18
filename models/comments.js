var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
	text: {
		type: String
	},

	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Profile"
		},
		username: String
	}
});


var Comment = mongoose.model("Comment", commentSchema);

module.exports = {
	Comment
}