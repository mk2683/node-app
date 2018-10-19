var mongoose = require("mongoose");

var likeSchema = new mongoose.Schema({

	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Profile"
		},
		name: String,
		designation: String,
		avatarPath: String
	}
});


var Like = mongoose.model("Like", likeSchema);

module.exports = {
	Like
}

