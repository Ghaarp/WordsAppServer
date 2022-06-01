const ApiError = require("../Errors/ApiError");

class RuntimeHelper {
  static async execute(next, action, params) {
    try {
      return await action(params);
    } catch (e) {
      next(e);
      return;
    }
  }
}

module.exports = RuntimeHelper;
