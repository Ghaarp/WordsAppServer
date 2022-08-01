const definitionsParser = require("./items/definitionsParser");
const examplesParser = require("./items/examplesParser");
const translationsParser = require("./items/translationsParser");
const fixesParser = require("./items/fixesParser");

//.raw[3][2][0] - examples ... [x][1] - example

//.raw[3][5][0] - synonyms
//.raw[3][5][0][x][1] - synonyms ... [x][0] - synonym

class TranslatorParser {
  constructResult(
    original,
    translation,
    fix,
    definitionsData,
    examplesData,
    translationsData
  ) {
    return {
      additionalData: { definitionsData, examplesData, translationsData },
      original,
      translation,
      fix,
    };
  }

  convertResult(translation) {
    if (translation.raw.length < 3) {
      return this.constructResult(translation.original, translation.text);
    }

    const fix = fixesParser.extractFix(translation);

    const data = translation.raw[3]; //.raw[3] - additional data
    const definitionsItems =
      this.isDataSectionValid(data, 1, 0) &&
      definitionsParser.extractDefinitions(data[1][0]);
    const examplesItems =
      this.isDataSectionValid(data, 2, 0) &&
      examplesParser.extractExamples(data[2][0]);
    const translationsItems =
      this.isDataSectionValid(data, 5, 0) &&
      translationsParser.extractTranslations(data[5][0]);
    const examplesData = examplesItems &&
      examplesItems.length > 0 && { indexableItems: examplesItems };
    const definitionsData = definitionsItems &&
      definitionsItems.length > 0 && { items: definitionsItems };
    const translationsData = translationsItems &&
      translationsItems.length > 0 && { items: translationsItems };
    return this.constructResult(
      translation.original,
      translation.text,
      fix,
      definitionsData,
      examplesData,
      translationsData
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
