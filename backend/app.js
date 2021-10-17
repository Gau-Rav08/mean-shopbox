const express = require("express");
const mongoose = require("mongoose");
const uri =
	"mongodb+srv://test:test@cluster0.uwxwn.mongodb.net/shopbox?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const cors = require("cors");

const userModel = require("./model/user");

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
	user.save();
});

app.get("/api/login", async (req, res) => {
	var data = await userModel.findOne({
		$and: [{ email: req.body.email }, { password: req.body.password }],
	});
	res.send(data);
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
