const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
  res.clearCookie("access_token"); // clear the cookie
  res.send("Logout successfully");
});

module.exports = router;
