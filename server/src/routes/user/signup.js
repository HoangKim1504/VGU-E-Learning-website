// signup.js: This file will contain the signup related route.
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { db } = require("../../configs/db");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // set up hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // save user to MySQL
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Registration failed");
        }
        console.log(result);

        // Insert email into profiles table
        db.query(
          "INSERT INTO profiles (email) VALUES (?)",
          [email],
          (err, result) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .send("Registration successfully and Profile creation failed");
            }
            console.log(result);
            res
              .status(201)
              .send("Registration and Profile creation successfully");
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration failed");
  }
});

module.exports = router;
