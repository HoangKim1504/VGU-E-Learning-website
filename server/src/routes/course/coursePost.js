const express = require("express");
const router = express.Router();

router.get("/courses/:title/post", (req, res) => {
  // get the course title from the URL parameter
  const subject = req.params.title;
  // get the course post
  const query = "SELECT * FROM posts WHERE subject = ? ORDER BY date DESC";
  db.query(query, [subject], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.toString() });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
