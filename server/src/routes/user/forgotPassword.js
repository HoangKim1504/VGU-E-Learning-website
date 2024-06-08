const express = require("express");
const router = express.Router();

// forgot password route
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  // find user by email in MySQL
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("An error occurred");
    }
    // check if user not found
    if (result.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = result[0]; // get user from MySQL
    // generate token with user id and expire in 5 minutes
    const randomString = Math.random().toString(36).substring(2, 15);
    // save random string to MySQL
    db.query(
      "UPDATE users SET random_string = ? WHERE email = ?",
      [randomString, user.email],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("An error occurred");
        }
      }
    );
    // set expiration time for the token
    setTimeout(() => {
      // code to expire token after 5 minutes
    }, 5 * 60 * 1000);

    // send email with token to user email address using nodemailer package
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "testweb1504@gmail.com",
        pass: "psal juoi dlug dvjs", // app password in Gmail
      },
    });

    // content of email
    var mailOptions = {
      from: "testweb1504@gmail.com",
      to: user.email, // send mail to user email
      subject: "Reset your password",
      html: `<p>You're receiving this email because you requested a password reset for your account.</p>
        <p> Please click the button below to reset your password.</p>
        <a 
          class="reset-button"
          href="http://localhost:3000/reset-password/${randomString}" 
          style="
            display: inline-block;
            background-color: #FFA500; 
            color: white; 
            padding: 15px 32px; 
            text-align: center; 
            text-decoration: none; 
            font-size: 16px; 
            margin: 4px 2px; 
            cursor: pointer;
          "
        >
          Reset Password
        </a>`,
    };

    // send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
});

module.exports = router;
