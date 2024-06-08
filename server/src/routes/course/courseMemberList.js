const express = require("express");
const router = express.Router();

router.get("/courses/:title/member-list", (req, res) => {
  // get the course title from the URL parameter
  const title = req.params.title;
  // get the course info
  const query = "SELECT DISTINCT email FROM enrollments";
  const email = req.email;
  db.query(query, [email], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.toString() });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
