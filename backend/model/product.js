const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: { type: String },
		description: { type: String },
		price: { type: Number },
		brand: { type: String },
		image: { type: String },
		ram: { type: Number },
		rom: { type: Number },
		camera: { type: String },
		battery: { type: Number },
		screen: { type: String },
		processor: { type: String },
	},
	{ collection: "product" }
);

productSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = mongoose.model("Product", productSchema);
