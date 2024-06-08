const express = require("express");
const router = express.Router();

router.get("/courses/:title/course-info", (req, res) => {
  // get the course title from the URL parameter
  const title = req.params.title;
  // get the course info
  const query = "SELECT * FROM enrollments WHERE title = ?";
  db.query(query, [title], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.toString() });
    } else {
      res.json(results[0]);
    }
  });
});

module.exports = router;
