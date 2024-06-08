// Middleware to set Access-Control-Allow-Credentials header
module.exports = function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  next();
};
