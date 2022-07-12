const search = require("../core/search");
const translator = require("../core/translator");
const ApiError = require("../Errors/ApiError");
const cardDbHelper = require("../helpers/cardDbHelper");

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

    return CardRuntimeHelper.makeExpressionInfoResponse(translation, {
      imageData,
    });
  }

  static makeExpressionInfoResponse(translation, imageData) {
    if (translation.additionalData) {
      translation.additionalData.imageData = imageData;
    }
    return { translation };
  }

  static async getCardData({ cardId }) {
    if (!cardId) return;
    return await cardDbHelper.findOneByID(cardId);
  }

  static async createCard({ card, user }) {
    if (!card) return;
    return await cardDbHelper.createCard(card, user);
  }
}

module.exports = CardRuntimeHelper;
