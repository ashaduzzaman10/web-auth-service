const { hashPassword } = require("../utils/helper");

const registerRoute = require("express").Router();
const User = require("../models/userModel");

// User registration route
registerRoute.post("/register", async (req, res) => {
	try {
		const { email, password } = req.body;
		const hashedPassword = await hashPassword(password);
		const newUser = new User({ email, password: hashedPassword });
		await newUser.save();
		res.status(201).json({
			success: true,
			message: "User created successfully",
			data: newUser,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Cannot create the user",
			data: error.message,
		});
	}
});

module.exports = registerRoute;
