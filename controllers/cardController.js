const cardRuntimeHelper = require("../helpers/cardRuntimeHelper");
const runtimeHelper = require("../helpers/runtimeHelper");
const ApiError = require("../Errors/ApiError");

class CardController {
  async findExpressionInfo(req, res, next) {
    const result = await runtimeHelper.execute(
      next,
      cardRuntimeHelper.fetchExpressionInfo,
      req.body
    );

    if (!result) return;

    const { expression } = req.body;
    return res.json({
      expression,
      translation: result.translation,
      imageData: result.imageData,
    });
  }

  async getCardsList(req, res, next) {}

  async getCardInfo(req, res, next) {}

  async createCard(req, res, next) {}
}

module.exports = new CardController();
