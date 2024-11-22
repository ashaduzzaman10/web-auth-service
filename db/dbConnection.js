require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.DBURL || "mongodb://localhost:27017/web-auth-service";
const UserPass = process.env.USERPASS || "@admin123";

const finalURl = dbUrl.replace("<db_password>", encodeURIComponent(UserPass));

const dbConnection = async () => {
	try {
		await mongoose.connect(finalURl);
		console.log(`db connection successful`);
	} catch (error) {
		console.error(`dbConnection failed! Error: ${error.message}`);
		process.exit(1);
	}
};

module.exports = {
	dbConnection,
};
