const search = require("../core/search");
const translator = require("../core/translator");
const ApiError = require("../Errors/ApiError");
const cardDbHelper = require("./cardDbHelper");

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
    if (!cardId)
      throw ApiError.badRequest("Не указаны данные карточки для поиска");
    return await cardDbHelper.findOneByID(cardId);
  }

  static async createCard({ card, user }) {
    if (!card) throw ApiError.badRequest("Неверные данные карточки");
    return await cardDbHelper.createCard(card, user);
  }

  static async removeCard({ user, cardId }) {
    if (!cardId || !user)
      throw ApiError.badRequest("Не удалось удалить карточку");
    return await cardDbHelper.removeCard(user, cardId);
  }
}

module.exports = CardRuntimeHelper;
