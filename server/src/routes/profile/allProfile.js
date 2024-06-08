const express = require("express");
const router = express.Router();

router.get("/allProfile", (req, res) => {
  const query = "SELECT * FROM profiles";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("An error occurred");
    }
    res.send(result);
  });
});

module.exports = router;
