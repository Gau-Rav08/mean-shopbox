const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: { type: String },
	email: { type: String },
	password: { type: String },
	mobile: { type: String },
});

userSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = mongoose.model("User", userSchema);
