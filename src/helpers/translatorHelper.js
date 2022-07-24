const translate = require("@vitalets/google-translate-api");
const testJsonHelper = require("./testJsonHelper");

class TranslatorHelper {
  static async fetchRawTranslationJson(expression) {
    const translationRes = await translate(expression, {
      from: "en",
      to: "ru",
    });
    translationRes.original = expression;
    //testJsonHelper.writeTestFile(JSON.stringify(translationRes));
    return translationRes;
  }
}

module.exports = TranslatorHelper;
