const { Card } = require("../models/model");
const ApiError = require("../errors/ApiError");
const sequelize = require("../db");

class CardDbHelper {
  static async findOneByID(id) {
    const result = await Card.findOne({
      where: {
        id,
      },
    });
    if (!result) return;

    const data = JSON.parse(result.cardJSON);
    return { data };
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
        cardJSON: JSON.stringify(data),
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
        cardJSON: JSON.stringify(data),
        image: JSON.stringify(this._getMainImage(data)),
      },
      {
        where: {
          expression: data.original,
        },
      }
    );

    if (result) return true;
    throw ApiError.internal("Внутренняя ошибка сервера");
  }

  static async removeCard(user, cardId) {
    if (!user) throw "Неизвестный пользователь";

    const card = await Card.findOne({ where: { id: cardId } });
    if (!card) return true;

    if (card.ownerId !== user.id)
      throw ApiError.badRequest("Только владелец может удалить карточку");

    const result = await Card.destroy({
      where: { ownerId: user.id, id: cardId },
    });

    if (result) return true;
    throw ApiError.internal("Внутренняя ошибка сервера");
  }

  static async getCardsList({ user, count, page }) {
    if (!user) throw "Неизвестный пользователь";

    const cardsList = await CardDbHelper.getCards(user);

    if (!cardsList) return;

    const slicedList = cardsList.slice(count * page, count * page + count);
    return { cards: slicedList, page, total: cardsList.length };
  }

  static async getCards(user) {
    if (!user) throw "Неизвестный пользователь";

    const result = await sequelize.query(
      "WITH ids_table AS (SELECT \n" +
        "    usersTable.id AS userId \n" +
        "FROM \n" +
        "   users AS usersTable \n" +
        "WHERE \n" +
        `   usersTable.id = ${user.id}\n` +
        "UNION ALL \n" +
        "\n" +
        "SELECT \n" +
        "   outgoing.friend AS userId \n" +
        "FROM \n" +
        "   users AS usersTable \n" +
        "LEFT JOIN \n" +
        "   friends as outgoing \n" +
        "   ON usersTable.id = outgoing.owner \n" +
        "LEFT JOIN \n" +
        "   friends as incoming \n" +
        "   ON outgoing.owner = incoming.friend \n" +
        "    AND outgoing.friend = incoming.owner \n" +
        "\n" +
        "WHERE \n" +
        `   usersTable.id = ${user.id} AND  \n` +
        '   incoming."shareCards" AND \n' +
        "   CASE \n" +
        "    WHEN incoming.id IS NULL \n" +
        "    THEN false \n" +
        "    ELSE true \n" +
        "   END = true) \n" +
        "\n" +
        "SELECT  \n" +
        " cardData.id AS id, \n" +
        " cardData.expression AS expression, \n" +
        " cardData.translation AS translation, \n" +
        " cardData.image AS image, \n" +
        ' cardData."ownerId" AS ownerId \n' +
        "FROM public.cards AS cardData \n" +
        " INNER JOIN  \n" +
        "  ids_table  \n" +
        " ON \n" +
        '  ids_table.userId = cardData."ownerId"\n' +
        "\n" +
        "ORDER BY cardData.id ASC "
    );

    if (!result || !result.length) throw ApiError.internal("Database error");
    return result[0];

    /*WITH ids_table AS (SELECT
          usersTable.id AS userId
      FROM
          users AS usersTable
      WHERE
          usersTable.id = 8
      UNION ALL

      SELECT
         outgoing.friend AS userId
      FROM
         users AS usersTable
      LEFT JOIN
         friends as outgoing
         ON usersTable.id = outgoing.owner
      LEFT JOIN
         friends as incoming
         ON outgoing.owner = incoming.friend
           AND outgoing.friend = incoming.owner

      WHERE
         usersTable.id = 8 AND
         incoming."shareCards" AND
         CASE
           WHEN incoming.id IS NULL
           THEN false
           ELSE true
         END = true)

      SELECT
       cardData.id AS id,
       cardData.expression AS expression,
       cardData.translation AS translation,
       cardData.image AS image,
       cardData."ownerId" AS ownerId
      FROM public.cards AS cardData
       INNER JOIN
        ids_table
       ON
        ids_table.userId = cardData."ownerId"

      ORDER BY cardData.id ASC */
  }

  static _getMainImage(data) {
    const imageData = data?.additionalData?.imageData?.imageData;
    if (!imageData) return;
    return imageData.filter((element) => element && element.isMainElement)?.[0];
  }
}

module.exports = CardDbHelper;
