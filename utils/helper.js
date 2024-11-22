const bcrypt = require("bcrypt");
// hashing  functions
const hashPassword = async (password) => {
	try {
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		return await bcrypt.hash(password, salt);
	} catch (error) {
		throw new Error("Error hashing password");
	}
};

const verifyPassword = async (password, hashPassword) => {
	try {
		return await bcrypt.compare(password, hashPassword);
	} catch (error) {
		throw new Error("Error verifying password");
	}
};

module.exports = {
	verifyPassword,
	hashPassword,
};
