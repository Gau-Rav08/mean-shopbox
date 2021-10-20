const express = require("express");
const mongoose = require("mongoose");
const uri =
	"mongodb+srv://test:test@cluster0.uwxwn.mongodb.net/shopbox?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const cors = require("cors");

const userModel = require("./model/user");
const productModel = require("./model/product");

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: "*",
		methods: ["GET", "PUT", "DELETE", "PATCH", "POST"],
		allowedHeaders:
			"Content-Type, Authorization, Origin, X-Requested-With, Accept",
	})
);
app.use(express.urlencoded({ extended: true }));

app.post("/api/signup", (req, res) => {
	var user = new userModel({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	userModel.findOne({ email: req.body.email }, (err, existingUser) => {
		if (existingUser) {
			res.json({
				success: false,
				message: "Account with that email is already exists",
			});
		} else {
			user.save();
			res.json({ success: true });
		}
	});
});

app.post("/api/login", async (req, res) => {
	var data = await userModel.findOne({
		$and: [{ email: req.body.email }, { password: req.body.password }],
	});
	if (data) {
		res.json({ success: true, user: data });
	} else {
		res.json({ success: false, message: "Incorrect Email or Password." });
	}
});

app.get("/api/product/:id", async (req, res) => {
	try {
		let productId = req.params.id;
		const product = await productModel.findById(productId);
		if (product) {
			res.json(product);
		} else {
			res.status(404).json({
				message: "No product found",
			});
		}
	} catch (err) {
		res.status(400).json({
			message: "Failed to get product details",
		});
	}
});

app.get("/api/newproducts", async (req, res) => {
	try {
		const product = await productModel
			.find()
			.limit(8)
			.sort({ releasedDate: -1 });
		if (product) {
			res.json(product);
		} else {
			res.status(404).json({
				message: "No product found",
			});
		}
	} catch (err) {
		res.status(400).json({
			message: "Something went wrong",
		});
	}
});

app.post("/api/addToCart", async (req, res) => {
	let prodId = req.body.productId;
	let userId = req.body.userId;
	let user = await userModel.findById(userId);
	let cart = user.cart;
	let exist = false;
	for (let i = 0; i < cart.length; i++) {
		if (cart[i].productId == prodId) {
			cart[i].quantity++;
			exist = true;
			await userModel.findByIdAndUpdate(userId, { cart: cart });
		}
	}
	if (!exist) {
		await userModel.findByIdAndUpdate(userId, {
			cart: [...cart, { productId: prodId }],
		});
	}
});

app.post("/api/removeFromCart", async (req, res) => {
	let prodId = req.body.productId;
	let userId = req.body.userId;
	let user = await userModel.findById(userId);
	let cart = user.cart;
	for (let i = 0; i < cart.length; i++) {
		if (cart[i].productId == prodId) {
			cart[i].quantity--;
			exist = true;
			await userModel.findByIdAndUpdate(userId, { cart: cart });
		}
	}
});

app.post("/api/cart", async (req, res) => {
	try {
		let userId = req.body.id;
		const user = await userModel.findById(userId);
		let cart = user.cart;
		let cartItems = [];
		let total = 0;
		for (let i = 0; i < cart.length; i++) {
			let items = await productModel.findById(cart[i].productId);
			cartItems.push([items, cart[i].quantity, items.price * cart[i].quantity]);
			total += items.price * cart[i].quantity;
		}
		res.json({ items: cartItems, tot: total });
	} catch (err) {
		res.status(400).json({
			message: "Failed to get cart details",
		});
	}
});

// app.get("/polls", async (req, res) => {
// 	let data = await poll
// 		.find(
// 			{ district: req.query.district, ac: req.query.ac },
// 			{ _id: 0, poll_stat: 1 }
// 		)
// 		.limit()
// 		.sort({ poll_stat: 1 });
// 	res.send(data);
// });

app.listen(3000);
