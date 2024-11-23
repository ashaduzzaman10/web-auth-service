# Web Auth Service
live-link :  https://web-auth-service.onrender.com/
## Description
A web authentication service built with Node.js, Express, and MongoDB. This service provides user registration and login functionalities with password hashing and verification.

## Table of Contents
- [Web Auth Service](#web-auth-service)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Routes](#routes)
    - [User Registration](#user-registration)
    - [User Login](#user-login)
    - [Health Check](#health-check)
  - [Error Handling](#error-handling)
  - [Environment Variables](#environment-variables)
  - [Middleware](#middleware)
  - [Models](#models)
    - [User Model](#user-model)
  - [Helper Functions](#helper-functions)

## Installation
1. Clone the repository:
  ```sh
https://github.com/ashaduzzaman10/web-auth-service.git
  ```
2. Navigate to the project directory:
  ```sh
  cd web-auth-service
  ```
3. Install the dependencies:
  ```sh
  npm install
  ```

## Usage
1. Start the server:
  ```sh
  npm start
  ```
2. The server will run on the port specified in the `.env` file or default to `4000`.

## Routes
### User Registration
- **URL:** `/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - Success: `201 Created`
  - Failure: `500 Internal Server Error`

### User Login
- **URL:** `/login`
- **Method:** `POST`
- **Description:** Logs in an existing user.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - Success: `200 OK`
  - Failure: `401 Unauthorized` or `500 Internal Server Error`

### Health Check
- **URL:** `/health`
- **Method:** `GET`
- **Description:** Checks the health of the service.
- **Response:**
  - Success: `200 OK`

## Error Handling
- **404 Not Found:**
  - Triggered when a route is not found.
  - Response:
    ```json
    {
      "success": false,
      "message": "Not found 🫡"
    }
    ```
- **500 Internal Server Error:**
  - Triggered when a server error occurs.
  - Response:
    ```json
    {
      "success": false,
      "message": "Server error occurs 🤕",
      "error": "<error-message>"
    }
    ```

## Environment Variables
- **PORT:** The port on which the server runs. Default is `4000`.
- **USERPASS:** The password for the database user.
- **DBURL:** The URL for the MongoDB database.

## Middleware
- **Common Middleware:**
  - `cors()`
  - `morgan("dev")`
  - `express.json()`
  - `express.urlencoded({ extended: true })`

## Models
### User Model
- **Schema:**
  ```js
  const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  });
  ```

## Helper Functions
- **hashPassword:** Hashes a plain text password.
- **verifyPassword:** Verifies a plain text password against a hashed password.
