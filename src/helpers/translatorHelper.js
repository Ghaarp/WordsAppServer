const translate = require("@vitalets/google-translate-api");

class TranslatorHelper {
  static async fetchRawTranslationJson(expression) {
    const translationRes = await translate(expression, {
      from: "en",
      to: "ru",
    });
    translationRes.original = expression;
    return translationRes;
  }
}

module.exports = TranslatorHelper;
