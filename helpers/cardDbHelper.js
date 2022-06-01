const { Card } = require("../models/model");

class CardDbHelper {
  static async findOneByID(id) {
    return await Card.findOne({
      where: {
        id,
      },
    });
  }

  static async findOneByWord(word) {
    return await Card.findOne({
      where: {
        word,
      },
    });
  }
}

module.exports = CardDbHelper;
