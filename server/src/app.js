// app.js: This file will set up the express application.
const express = require("express");
const app = express();
const cors = require("cors"); // Import the CORS middleware
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

// Use the CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
// parse the cookie
app.use(cookieParser());

// Use express-session middleware
app.use(
  expressSession({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

module.exports = app;
