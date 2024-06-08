const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // specify the destination directory for uploaded files
const router = express.Router();

router.post(
  "/editProfile/uploadAvatar",
  upload.single("avatar"),
  (req, res) => {
    console.log("image: ", req.file);
    // get token from cookie
    const token = req.cookies.access_token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided", auth: false });
    } else {
      jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.json({ message: "Token is wrong", auth: false });
        } else {
          // get user email from token
          email = decoded.email;

          if (req.file && req.file.filename) {
            const avatar = req.file.filename;

            const query = `UPDATE profiles SET avatar = ? WHERE email = ?`;

            db.query(query, [avatar, email], (err, result) => {
              if (err) {
                console.log(err);
                return res.status(500).send("An error occurred");
              }
              return res.send({ Status: "Success", data: result });
            });
          }
        }
      });
    }
  }
);

module.exports = router;
