require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors"); // Import the CORS middleware
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const PORT = 5000;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
var nodemailer = require("nodemailer");

// connect MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "#Hoangkim1504",
  database: "users",
});

db.connect((err) => {
  if (err) {
    console.log("MySQL failed:", err);
    return;
  } else {
    console.log("MySQL connected");
  }
});

/** Middleware */
// parse the body
app.use(express.json()); // transfer the data that we are passing from frontend to backend that will transfer to the Json format

// parse the cookie
app.use(cookieParser());

// Use the CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware to set Access-Control-Allow-Credentials header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Middleware to verify JWT token
const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Token:", token);
  if (!token) {
    return res.status(401).json({ message: "No token provided", auth: false });
  } else {
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ message: "Token is wrong", auth: false });
      } else {
        req.user = decoded.email; // set the email to req.user
        next();
      }
    });
  }
};

// isAuth route
app.get("/isAuth", verifyUser, async (req, res) => {
  return res.status(200).json({ message: "Login successfully", auth: true });
});

// login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email in MySQL
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result && result.length > 0) {
        const user = result[0];
        // compare bcrypt password
        bcrypt.compare(password, user.password, (err, passwordMatch) => {
          if (passwordMatch) {
            // create JWT token with user name and email and expire in 24 hours
            const token = jwt.sign(
              { name: user.name, email: user.email },
              TOKEN_SECRET,
              {
                expiresIn: "24h",
              }
            );
            // set cookie with token and send response to frontend to store the token in cookie
            res.cookie("access_token", token, {
              httpOnly: false, // allow to access the token in frontend
              secure: process.env.NODE_ENV === "production", // set to true in production
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
            });
            return res.status(200).send("Save token in Cookie successfully");
          } else {
            res.status(401).json({ message: "Invalid Credentials" });
          }
        });
      } else {
        res.status(404).send("User not found");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

// signup route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // set up hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // save user to MySQL
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Registration failed");
        }
        console.log(result);
        res.status(201).send("Registered successfully");
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration failed");
  }
});

// forgot password route
app.post("/forgot-password", (req, res) => {
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

// reset password route
app.post("/reset-password/:randomString", (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  // get random string from URL
  const randomString = String(req.params.randomString);

  // set expiration time for the random string
  setTimeout(() => {
    // code to expire the random string after 5 minutes
  }, 5 * 60 * 1000);

  // find user by random string in MySQL
  db.query(
    "SELECT * FROM users WHERE random_string = ?",
    [randomString],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred");
      }
      // check if user not found
      if (result.length === 0) {
        return res.status(404).send("User not found");
      }

      const user = result[0]; // get user from MySQL

      // hash new password
      bcrypt
        .hash(newPassword, 10)
        .then((hashedPassword) => {
          console.log(hashedPassword);
          db.query(
            "UPDATE users SET password = ? WHERE random_string = ?",
            [hashedPassword, user.random_string],
            (err, result) => {
              if (err) {
                console.log(err);
                return res.status(500).send("An error occurred");
              }
              return res.send({ Status: "Success" });
            }
          );
        })
        .catch((err) => {
          console.error(err);
          res.send({ Status: "Error" });
        });
    }
  );
});

// logout route
app.get("/logout", (req, res) => {
  res.clearCookie("access_token"); // clear the cookie
  res.send("Logout successfully");
});

// courses list
app.get("/courses", (req, res) => {
  // get the page number from query parameter or default to 1
  const page = parseInt(req.query.page) || 1;
  // get the page size from query parameter or default to 12
  const pageSize = parseInt(req.query.pageSize) || 6;
  // calculate the offset
  const offset = (page - 1) * pageSize;
  // count total number of courses of the each user
  const countQuery = `SELECT COUNT(*) as count FROM enrollment WHERE email = ?`;
  // get courses with pagination
  const dataQuery = `SELECT * FROM enrollment WHERE email = ? LIMIT ${pageSize} OFFSET ${offset}`;
  // const userEmailQuery = `SELECT email FROM enrollment WHERE email = ?`;
  const userEmail = "thkim1504@gmail.com";

  db.query(countQuery, [userEmail], (error, countResults) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: error.toString() });
    } else {
      const totalCount = countResults[0].count; // get total count
      const totalPages = Math.ceil(totalCount / pageSize); // calculate total pages
      db.query(dataQuery, [userEmail], (error, dataResults) => {
        if (error) {
          res.status(500).json({ error: error.toString() });
        } else {
          res.header("X-Total-Count", totalCount);
          res.json({ data: dataResults, totalPages });
        }
      });
    }
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
