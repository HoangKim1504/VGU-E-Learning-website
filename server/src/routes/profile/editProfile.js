const express = require("express");
const router = express.Router();

router.post("/editProfile", (req, res) => {
  const { fullName, studentId, major, intake, phoneNumber, bio, avatar } =
    req.body;

  // get token from cookie
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "No token provided", auth: false });
  } else {
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ message: "Token is wrong", auth: false });
      } else {
        // get user email from token
        email = decoded.email;

        /** If a field has a value, it's added to the query string and query parameters.
         *  If a field doesn't have a value, it's ignored. */
        // initialize an array to hold the query parameters
        let queryParams = [];
        if (!fullName && !major && !intake && !phoneNumber && !bio && !avatar) {
          return res.send({ Status: "Success" });
        }

        // initialize the query string
        let query = "UPDATE profiles SET  ";

        // add each field to the query string and query parameters if it has a value
        if (fullName) {
          query += "full_name = ?, ";
          queryParams.push(fullName);
        }
        if (major) {
          query += "major = ?, ";
          queryParams.push(major);
        }
        if (intake) {
          query += "intake = ?, ";
          queryParams.push(intake);
        }
        if (phoneNumber) {
          query += "phone_number = ?, ";
          queryParams.push(phoneNumber);
        }
        if (bio) {
          query += "bio = ?, ";
          queryParams.push(bio);
        }
        if (avatar) {
          query += "avatar = ?, ";
          queryParams.push(avatar);
        }

        // remove the last comma and space from the query string to avoid SQL syntax error
        query = query.slice(0, -2);

        // add the WHERE clause to the query string
        query += " WHERE email = ?";

        // add the email to the query parameters
        queryParams.push(email);

        // update user info in MySQL
        db.query(query, queryParams, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send("An error occurred");
          }
          return res.send({ Status: "Success" });
        });
      }
    });
  }
});

module.exports = router;
