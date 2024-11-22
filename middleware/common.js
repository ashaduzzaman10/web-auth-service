const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const CommonMiddleware = [
	cors(),
	morgan("dev"),
	express.json(),
	express.urlencoded({ extended: true }),
];

module.exports = CommonMiddleware;
