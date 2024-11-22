const { verifyPassword } = require("../utils/helper");

const loginRoute = require("express").Router();
const User = require("../models/userModel");

// User login route
// @ts-ignore
loginRoute.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Not a valid user",
			});
		}

		const isMatch = await verifyPassword(password, user.password);
		if (isMatch) {
			res.status(200).json({
				success: true,
				message: "Valid user, you can login",
			});
		} else {
			res.status(401).json({
				success: false,
				message: "Not a valid user",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error during login",
			data: error.message,
		});
	}
});

module.exports = loginRoute;
