var mongoose = require("mongoose");

var likeSchema = new mongoose.Schema({

	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Profile"
		},
		username: String
	}
});


var Like = mongoose.model("Like", likeSchema);

module.exports = {
	Like
}

// count: {
// 		type: Number
// 	},
