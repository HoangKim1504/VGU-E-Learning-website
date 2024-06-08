/** config.js: This file will handle all the configuration related tasks like loading environment variables
 *  and setting up the database connection. */

// Import the dotenv module
require("dotenv").config();
const mysql = require("mysql");

// Export the configuration object
// Connect to the MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

db.connect((err) => {
  if (err) {
    console.log("MySQL failed:", err);
    return;
  } else {
    console.log("MySQL connected");
  }
});

module.exports = db;
