const UserHelper = require("../helpers/userHelper");
const ApiError = require("../errors/ApiError");

const isCorrectInput = (req) => {
  const { login, password } = req.body;
  return !(!login || !password);
};

class UserController {
  async login(req, res, next) {
    const { login, password } = req.body;

    if (!isCorrectInput(req)) {
      return next(ApiError.badRequest("Не указан логин или пароль"));
    }

    const foundUser = await UserHelper.findUser(login);
    if (!(await UserHelper.checkUserPasswordIsValid(foundUser, password))) {
      return next(ApiError.badRequest("Неверный логин или пароль"));
    }

    return res.json(UserHelper.generateJwt(foundUser));
  }

  async register(req, res, next) {
    const { login, password } = req.body;

    if (!isCorrectInput(req)) {
      return next(ApiError.badRequest("Не указан логин или пароль"));
    }

    const foundUser = await UserHelper.findUser(login);
    if (foundUser) {
      return next(
        ApiError.badRequest("Пользователь с таким логином уже зарегистрирован")
      );
    }

    try {
      const createdUser = await UserHelper.createUser(login, password);
      return res.json(UserHelper.generateJwt(createdUser));
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new UserController();
