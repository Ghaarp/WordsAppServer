const translate = require("@vitalets/google-translate-api");

class Translator {
  static async translateExpression(expression) {
    const translationRes = await translate(expression, {
      from: "en",
      to: "ru",
    });
    return translationRes.text;
  }
}

module.exports = Translator;
