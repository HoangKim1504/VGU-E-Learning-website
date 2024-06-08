const express = require("express");
const router = express.Router();

// courses list
router.get("/courses", (req, res) => {
  // get the page number from query parameter or default to 1
  const page = parseInt(req.query.page) || 1;
  // get the page size from query parameter or default to 12
  const pageSize = parseInt(req.query.pageSize) || 6;
  // calculate the offset
  const offset = (page - 1) * pageSize;
  // get user email from query parameter
  const user = req.query.email;
  // console.log("Email:", user);
  // count total number of courses of the each user
  const countQuery = `SELECT COUNT(*) as count FROM enrollments WHERE email = ?`;
  // get courses with pagination
  const dataQuery = `SELECT * FROM enrollments WHERE email = ? ORDER BY semester LIMIT ${pageSize} OFFSET ${offset}`;

  db.query(countQuery, [email], (error, countResults) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: error.toString() });
    } else {
      const totalCount = countResults[0].count; // get total count
      const totalPages = Math.ceil(totalCount / pageSize); // calculate total pages

      db.query(dataQuery, [email], (error, dataResults) => {
        if (error) {
          res.status(500).json({ error: error.toString() });
        } else {
          // set the total count in the header
          res.header("X-Total-Count", totalCount);
          // send the data to frontend
          res.json({ data: dataResults, totalPages, email });
        }
      });
    }
  });
});

module.exports = router;
