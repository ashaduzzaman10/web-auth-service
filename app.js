require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { dbConnection } = require("./db/dbConnection");
const User = require("./models/userModel");

const app = express();

const PORT = process.env.PORT || 4000;

app.use([
	cors(),
	morgan("dev"),
	express.json(),
	express.urlencoded({ extended: true }),
]);

// user route (register)
app.post("/register", async (req, res) => {
	const { email, password } = req.body;
	try {
		const newUser = new User({ email, password });
		await newUser.save();
		res.status(201).json({
			success: true,
			message: "user created successfully",
			data: newUser,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "cannot create the user",
			data: error.message,
		});
	}
});

// user route login
app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (user && user.password === password) {
			res.status(200).json({
				success: true,
				message: "valid user, you can login",
			});
		} else {
			res.status(401).json({
				success: false,
				message: "not a valid user",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "user not found!",
			data: error.message,
		});
	}
});

// health route
app.get("/health", (req, res) => {
	res.status(200).json({
		success: true,
		message: "ok, connection successful",
	});
});

// error handling
app.use((req, res, next) => {
	res.status(404).json({
		success: false,
		message: "not found 🫡",
	});
});

app.use((error, req, res, next) => {
	res.status(500).json({
		success: false,
		message: "server error occurs🤕",
		error: error.message,
	});
	console.log(error.message);
});

app.listen(PORT, async () => {
	await dbConnection();
	console.log(
		`server is connected on port : ${PORT} and your address is : http://localhost:${PORT}`
	);
});
