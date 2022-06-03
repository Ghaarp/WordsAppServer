const definitionsParser = require("./items/definitionsParser");
const examplesParser = require("./items/examplesParser");
const translationsParser = require("./items/translationsParser");

//.raw[3][2][0] - examples ... [x][1] - example

//.raw[3][5][0] - synonyms
//.raw[3][5][0][x][1] - synonyms ... [x][0] - synonym

class TranslatorParser {
  constructResult(original, translation, definitions, examples, translations) {
    return {
      original,
      translation,
      definitions,
      examples,
      translations,
    };
  }

  convertResult(translation) {
    if (translation.raw.length < 3) {
      return this.constructResult(translation.original, translation.text);
    }

    const data = translation.raw[3]; //.raw[3] - additional data
    const definitions = this.isDataSectionValid(data, 1, 0)
      ? definitionsParser.extractDefinitions(data[1][0])
      : undefined;
    const examples = this.isDataSectionValid(data, 2, 0)
      ? examplesParser.extractExamples(data[2][0])
      : undefined;
    const translations = this.isDataSectionValid(data, 5, 0)
      ? translationsParser.extractTranslations(data[5][0])
      : undefined;

    return this.constructResult(
      translation.original,
      translation.text,
      definitions,
      examples,
      translations
    );
  }

  isDataSectionValid(data, x, y) {
    if (
      !data ||
      data.length == 0 ||
      !data[x] ||
      data[x].length == 0 ||
      !data[x][y] ||
      data[x][y].length == 0
    )
      return false;

    return true;
  }
}

module.exports = new TranslatorParser();
