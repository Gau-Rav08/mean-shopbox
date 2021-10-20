const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, trim: true },
		phone: { type: String },
	},
	{ collection: "users" }
);

userSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = mongoose.model("User", userSchema);
