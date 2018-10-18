var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
	text: {
		type: String
	},

	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Profile"
		},
		name: String,
		commentedOn: {
			type: Date,
			default: Date.now()
		},
	}
});


var Comment = mongoose.model("Comment", commentSchema);

module.exports = {
	Comment
}