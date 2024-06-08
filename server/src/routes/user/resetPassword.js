const express = require("express");
const router = express.Router();

router.post("/reset-password/:randomString", (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  // get random string from URL
  const randomString = String(req.params.randomString);

  // set expiration time for the random string
  setTimeout(() => {
    // code to expire the random string after 5 minutes
  }, 5 * 60 * 1000);

  // find user by random string in MySQL
  db.query(
    "SELECT * FROM users WHERE random_string = ?",
    [randomString],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred");
      }
      // check if user not found
      if (result.length === 0) {
        return res.status(404).send("User not found");
      }

      const user = result[0]; // get user from MySQL

      // hash new password
      bcrypt
        .hash(newPassword, 10)
        .then((hashedPassword) => {
          console.log(hashedPassword);
          db.query(
            "UPDATE users SET password = ? WHERE random_string = ?",
            [hashedPassword, user.random_string],
            (err, result) => {
              if (err) {
                console.log(err);
                return res.status(500).send("An error occurred");
              }
              return res.send({ Status: "Success" });
            }
          );
        })
        .catch((err) => {
          console.error(err);
          res.send({ Status: "Error" });
        });
    }
  );
});

module.exports = router;
