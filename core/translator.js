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
    return translatorParser.convertResult(translation);
  }
}

module.exports = Translator;
