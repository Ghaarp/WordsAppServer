const { Card } = require("../models/model");
const ApiError = require("../Errors/ApiError");
const sequelize = require("../db");

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
      throw ApiError.internal("Database error");
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
    throw ApiError.internal("Database error");
  }

  static async getCardsList({ user }) {
    if (!user) throw "Unknown user";

    const result = await sequelize.query(
      `WITH ids_table AS (\n` +
        "SELECT\n" +
        "   usersTable.id AS userId\n" +
        "   FROM\n" +
        "     users AS usersTable\n" +
        "   WHERE\n" +
        `     usersTable.id = ${user.id}\n` +
        " UNION ALL\n" +
        " SELECT\n" +
        "   outgoing.friend AS userId\n" +
        " FROM\n" +
        "   users AS usersTable\n" +
        " LEFT JOIN\n" +
        "   friends as outgoing\n" +
        "   ON usersTable.id = outgoing.owner\n" +
        " LEFT JOIN\n" +
        "   friends as incoming\n" +
        "   ON outgoing.owner = incoming.friend\n" +
        "     AND outgoing.friend = incoming.owner\n" +
        "\n" +
        " WHERE\n" +
        `  usersTable.id = ${user.id} AND \n` +
        "  CASE\n" +
        "    WHEN incoming.id IS NULL\n" +
        "    THEN false\n" +
        "    ELSE true\n" +
        "  END = true)\n" +
        "\n" +
        "SELECT \n" +
        " cardData.id AS id,\n" +
        " cardData.expression AS expression,\n" +
        " cardData.translation AS translation,\n" +
        " cardData.image AS image,\n" +
        ' cardData."ownerId" AS ownerId\n' +
        "FROM public.cards AS cardData\n" +
        " INNER JOIN \n" +
        "  ids_table \n" +
        " ON\n" +
        '  ids_table.userId = cardData."ownerId"\n' +
        "  \n" +
        "ORDER BY cardData.id ASC \n"
    );

    if (!result || !result.length) throw ApiError.internal("Database error");

    console.log(result[0]);
    return result[0];
  }

  static _getMainImage(data) {
    const imageData = data?.additionalData?.imageData?.imageData;
    if (!imageData) return;
    return imageData.filter((element) => element && element.isMainElement)?.[0];
  }
}

module.exports = CardDbHelper;
