const translatorHelper = require("../helpers/translatorHelper");
const translatorParser = require("../parse/translatorParser");

class Translator {
  constructor(expression) {
    this._expression = expression;
  }

  async translate() {
    const translation = await translatorHelper.fetchRawTranslationJson(
      this._expression
    );

    const result = translatorParser.convertResult(translation);
    console.log(result);
    return result;
  }
}

module.exports = Translator;
