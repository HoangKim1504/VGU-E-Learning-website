// auth.js: This file will contain the authentication related routes.
const express = require("express");
const router = express.Router();
const { verifyUser } = require("../../middlewares/verifyUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../configs/db");
const TOKEN_SECRET = require("../../configs/config");

// isAuth route
router.get("/isAuth", verifyUser, async (req, res) => {
  return res
    .status(200)
    .json({ message: "Login successfully", auth: true, email: req.user });
});

// login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email in MySQL
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result && result.length > 0) {
        const user = result[0];
        // compare bcrypt password
        bcrypt.compare(password, user.password, (err, passwordMatch) => {
          if (passwordMatch) {
            // create JWT token with user name and email and expire in 24 hours
            const token = jwt.sign(
              { name: user.name, email: user.email },
              TOKEN_SECRET,
              {
                expiresIn: "24h",
              }
            );
            // set cookie with token and send response to frontend to store the token in cookie
            res.cookie("access_token", token, {
              httpOnly: false, // allow to access the token in frontend
              secure: process.env.NODE_ENV === "production", // set to true in production
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
            });
            return res.status(200).send("Save token in Cookie successfully");
          } else {
            res.status(401).json({ message: "Invalid Credentials" });
          }
        });
      } else {
        res.status(404).send("User not found");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
