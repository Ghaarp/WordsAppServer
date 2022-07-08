const { Card } = require("../models/model");
const ApiError = require("../Errors/ApiError");

class CardDbHelper {
  static async findOneByID(id) {
    return await Card.findOne({
      where: {
        id,
      },
    });
  }

  static async findOneByExpression(expression) {
    return await Card.findOne({
      where: {
        expression,
      },
    });
  }

  static async createCard(card, user) {
    if (!card || !card.data) return;

    console.log(user);

    const { data } = card;
    const created = data.original
      ? await CardDbHelper.findOneByExpression(data.original)
      : undefined;

    if (!created) {
      const result = await Card.create({
        ownerId: user?.id,
        expression: data.original,
        translation: data.translation,
        translationData: JSON.stringify(card),
        image: JSON.stringify(this._getMainImage(data)),
      });

      if (result) return true;
      throw ApiError.internal("Card hasn't been saved");
    }

    const result = await Card.update(
      {
        ownerId: user?.id,
        expression: data.original,
        translation: data.translation,
        translationData: JSON.stringify(card),
        image: JSON.stringify(this._getMainImage(data)),
      },
      {
        where: {
          expression: data.original,
        },
      }
    );

    if (result) return true;
    throw ApiError.internal("Card hasn't been saved");
  }

  static _getMainImage(data) {
    const imageData = data?.additionalData?.imageData?.imageData;
    console.log(imageData);
    if (!imageData) return;
    return imageData.filter((element) => element && element.isMainElement)?.[0];
  }
}

module.exports = CardDbHelper;
