require("dotenv").config();
const express = require("express");
const { dbConnection } = require("./db/dbConnection");
const { notFoundHandler, serverError } = require("./error/error");
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const CommonMiddleware = require("./middleware/common");

//initialize the server

const app = express();
const PORT = process.env.PORT || 4000;

// for application level

app.use(CommonMiddleware);

// user Route

app.use(loginRoute);
app.use(registerRoute);

app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: "welcome to the home page",
	});
});
// Health route
app.get("/health", (req, res) => {
	res.status(200).json({
		success: true,
		message: "OK, connection successful",
	});
});

// Error handling

app.use(notFoundHandler);

app.use(serverError);

// start server

app.listen(PORT, async () => {
	await dbConnection();
	console.log(
		`Server is connected on port: ${PORT} and your address is: http://localhost:${PORT}`
	);
});
