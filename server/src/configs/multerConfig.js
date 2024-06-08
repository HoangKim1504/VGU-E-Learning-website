const multer = require("multer"); // Import multer package
const path = require("path");

// Multer
const storage = multer.diskStorage({
  // set the destination to save the image
  destination: (req, file, cb) => {
    // save the image in the avatar folder
    cb(null, "assets/avatar");
  },
  // set the image name
  filename: (req, file, cb) => {
    // set the image name to the current date and time
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// upload the image
const upload = multer({
  storage: storage,
});

module.exports = upload;
