class RuntimeHelper {
  static async execute(next, action, params) {
    try {
      return await action(params);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = RuntimeHelper;
