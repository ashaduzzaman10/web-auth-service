require("dotenv").config();
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address",
		],
	},

	password: {
		type: String,
		lowercase: true,
		required: true,
	},

	createdOn: {
		type: Date,
		default: Date.now,
	},
});


const encryptKey = process.env.ENC_KEY;

UserSchema.plugin(encrypt, {
	secret: encryptKey,
	encryptedFields: ["password"],
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
