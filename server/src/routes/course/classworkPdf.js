const express = require("express");
const router = express.Router();
const fs = require("fs"); // Add this line to import the 'fs' module

router.get("/courses/:title/classwork/pdf", (req, res) => {
  // get the course title from the URL parameter
  const title = req.params.title;
  // // get the base path
  // const basePath = process.env.FILE_PATH_MODULE;
  // // get the file path
  // const filePath = `${basePath}${title}.pdf`;
  // console.log(filePath);
  // get the title
  const query = "SELECT * FROM classworks WHERE subject = ?";

  // get the course pdf file from MySQL
  db.query(query, [title], (error, results) => {
    console.log("results: ", results[0].title); // title: column name in MySQL
    if (error) {
      res.status(500).json({ error: error.toString() });
    } else {
      // get the base path
      const basePath = process.env.FILE_PATH_CLASSWORK;
      // get the file path
      const filePath = `${basePath}${results[0].title}.pdf`;
      console.log(filePath);
      // read the file
      const fileContent = fs.readFileSync(filePath);
      // send the file
      res.contentType("application/pdf");
      // send the file content
      res.send(fileContent);
    }
  });
});

module.exports = router;
