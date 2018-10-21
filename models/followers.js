var mongoose = require("mongoose");

var followerSchema = new mongoose.Schema({

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


var Follower = mongoose.model("Follower", followerSchema);

module.exports = {
	Follower
}

