const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    req.body.user = decoded;
  }
  next();
};
