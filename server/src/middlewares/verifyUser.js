// Middleware to verify JWT token
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../configs/config");

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

module.exports = { verifyUser };
