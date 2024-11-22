require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { dbConnection } = require("./db/dbConnection");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 4000;

app.use([
    cors(),
    morgan("dev"),
    express.json(),
    express.urlencoded({ extended: true }),
]);

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

// User registration route
app.post("/register", async (req, res) => {
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

// User login route
app.post("/login", async (req, res) => {
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

// Health route
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "OK, connection successful",
    });
});

// Error handling
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Not found 🫡",
    });
});

app.use((error, req, res, next) => {
    res.status(500).json({
        success: false,
        message: "Server error occurs 🤕",
        error: error.message,
    });
    console.error(error.message);
});

app.listen(PORT, async () => {
    await dbConnection();
    console.log(`Server is connected on port: ${PORT} and your address is: http://localhost:${PORT}`);
});