module.exports = function (req, res, next) {
  if (req?.user == undefined)
    return res.status(401).json({ message: "Unauthorized" });
  console.log(`headers a: ${res.headersSent}`);
  next();
};
