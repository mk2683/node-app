var mongoose = require("mongoose");

var followingSchema = new mongoose.Schema({

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


var Following = mongoose.model("Following", followingSchema);

module.exports = {
	Following
}

