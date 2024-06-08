const express = require("express");
const router = express.Router();
const fs = require("fs"); // Add this line to import the 'fs' module

router.get("/courses/:title/pdf", (req, res) => {
  // get the course title from the URL parameter
  const subject = req.params.title;
  // get the base path
  const basePath = process.env.FILE_PATH_MODULE;
  // get the file path
  const filePath = `${basePath}${subject}.pdf`;
  // get the title
  const query = "SELECT * FROM classworks WHERE subject = ?";

  // get the course pdf file from MySQL
  db.query(query, [subject], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.toString() });
    } else {
      // read the file
      console.log("filePath: ", filePath);
      const fileContent = fs.readFileSync(filePath);
      // send the file
      res.contentType("application/pdf");
      // send the file content
      res.send(fileContent);
    }
  });
});

module.exports = router;
