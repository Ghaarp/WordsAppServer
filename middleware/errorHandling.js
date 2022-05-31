const ApiError = require("../Errors/ApiError");

module.exports = function errorHandling(err, req, res, next) {
  console.log(res);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ errorMessage: err.message });
  }

  return res.status(500).json({ message: "Unknown server error" });
};
