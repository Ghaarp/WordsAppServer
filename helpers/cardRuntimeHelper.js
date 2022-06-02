const search = require("../core/search");
const translator = require("../core/translator");
const ApiError = require("../Errors/ApiError");

const minExpLength = 2;

class CardRuntimeHelper {
  static async fetchExpressionInfo({ expression }) {
    if (!expression || expression.length < 2)
      throw ApiError.badRequest(
        `Expression is too short (must be at least ${minExpLength} characters)`
      );

    const translatorObject = new translator(expression);
    const translation = await translatorObject.translate();
    const imageData = await search.searchExpressionInfo(expression);

    return { translation, imageData };
  }
}

module.exports = CardRuntimeHelper;
