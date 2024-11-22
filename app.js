require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { dbConnection } = require("./db/dbConnection");

const app = express();

const PORT = process.env.PORT || 4000;

app.use([
    cors(),
    morgan("dev"),
    express.json(),
    express.urlencoded({ extended: true }),
]);

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ok, connection successful",
    });
});

// error handling
app.use((req, res, next) => {
    res.status(404).json({
        success: true,
        message: "not found 🫡",
    });
});

app.use((error, req, res, next) => {
    res.status(500).json({
        success: true,
        message: "server error occurs🤕",
        error: error.message,
    });
    console.log(error.message);
});

app.listen(PORT, async () => {
    await dbConnection();
    console.log(`server is connected on port : ${PORT} and your address is : http://localhost:${PORT}`);
});