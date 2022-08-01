const jwt = require("jsonwebtoken");
const errorHandling = require("./errorHandling");
const ApiError = require("../Errors/ApiError");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      req.body.user = decoded;
    } catch (e) {
      errorHandling(
        ApiError.unauthorized("Необходимо войти в систему заново"),
        req,
        res
      );
      return;
    }
  }
  next();
};
