const ApiError = require("../errors/ApiError");

module.exports = function errorHandling(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ errorMessage: err.message });
  }
  console.log(err);
  return res.status(500).json({ message: err.message });
};
