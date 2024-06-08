const express = require("express");
const router = express.Router();

router.get("/getProfile", (req, res) => {
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
        // find user by email in MySQL
        query = "SELECT * FROM profiles WHERE email = ?";

        // get user info from MySQL
        db.query(query, [email], (error, results) => {
          if (error) {
            res.status(500).json({ error: error.toString() });
          } else {
            // send user info to frontend
            res.json(results[0]);
          }
        });
      }
    });
  }
});

module.exports = router;
