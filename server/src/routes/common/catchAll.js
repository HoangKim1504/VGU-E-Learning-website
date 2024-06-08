const express = require("express");
const router = express.Router();

router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "reactjs", "build", "index.html"));
});

module.exports = router;
