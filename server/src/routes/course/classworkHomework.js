const express = require("express");
const router = express.Router();

router.get("/courses/:title/classwork/homework", (req, res) => {
  // get the course title from the URL parameter
  const subject = req.params.title;
  // get the course classwork
  const query =
    "SELECT * FROM classworks WHERE subject = ? AND type = 'Homework'";
  db.query(query, [subject], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.toString() });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
