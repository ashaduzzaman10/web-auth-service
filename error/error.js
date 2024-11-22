const notFoundHandler = (req, res, next) => {
	res.status(404).json({
		success: false,
		message: "Not found 🫡",
	});
};

const serverError = (error, req, res, next) => {
	res.status(500).json({
		success: false,
		message: "Server error occurs 🤕",
		error: error.message,
	});
	console.error(error.message);
};

module.exports = {
	notFoundHandler,
	serverError,
};
