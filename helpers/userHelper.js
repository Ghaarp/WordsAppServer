const { User } = require("../models/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../Errors/ApiError");

class UserHelper {
  static generateJwt(user) {
    const { id, login } = user;
    return jwt.sign({ id, login }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
  }

  static async findUser(loginParameter) {
    const login = loginParameter.toString();
    return await User.findOne({ where: { login } });
  }

  static async checkUserPasswordIsValid(user, password) {
    if (!user) {
      return false;
    }

    return bcrypt.compareSync(password, user.password);
  }

  static async createUser(loginParameter, passwordParameter) {
    const login = loginParameter.toString();
    const password = passwordParameter.toString();
    const hashedPass = await bcrypt.hash(password, 5);
    return await User.create({ login, password: hashedPass });
  }
}

module.exports = UserHelper;
