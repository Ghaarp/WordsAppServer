const cardRuntimeHelper = require("../helpers/cardRuntimeHelper");
const runtimeHelper = require("../helpers/runtimeHelper");
const ApiError = require("../Errors/ApiError");

class CardController {
  async findExpressionInfo(req, res, next) {
    console.log(req.body);
    const result = await runtimeHelper.execute(
      next,
      cardRuntimeHelper.fetchExpressionInfo,
      req.body
    );

    if (!result) return;

    return res.json({
      data: result.translation,
      imageData: result.imageData,
    });
  }

  async getCardsList(req, res, next) {}

  async getCardData(req, res, next) {
    const result = await runtimeHelper.execute(
      next,
      cardRuntimeHelper.getCardData,
      req.body
    );

    if (!result) return;

    return res.json(result);
  }

  async createCard(req, res, next) {
    console.log(req.body);
    return res.json("OK");
  }
}

module.exports = new CardController();
