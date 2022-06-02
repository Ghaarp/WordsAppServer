const definitionsParser = require("./items/definitionsParser");
const examplesParser = require("./items/examplesParser");
const synonymsParser = require("./items/synonymsParser");

//.raw[3][1] - definitions
//.raw[3][1][0][x][0] - type
//.raw[3][1][0][x][1] - definitions ... [x][0] - explanation [x][1] - example

//.raw[3][2][0] - examples ... [x][1] - example

//.raw[3][5][0] - synonyms
//.raw[3][5][0][x][1] - synonyms ... [x][0] - synonym

class TranslatorParser {
  constructResult(
    original,
    translation,
    definitions,
    examples,
    alternativeTranslations
  ) {
    return {
      original,
      translation,
      definitions,
      examples,
      alternativeTranslations,
    };
  }

  convertResult(translation) {
    if (translation.raw.length < 3) {
      return this.constructResult(translation.original, translation.text);
    }

    const data = translation.raw[3]; //.raw[3] - additional data
    const definitions = definitionsParser.extractDefinitions(data);
    const examples = examplesParser.extractExamples(data[2][0]);
    const alternativeTranslations =
      synonymsParser.extractAlternativeTranslations(data[5][0]);

    return this.constructResult(
      translation.original,
      translation.text,
      definitions,
      examples,
      alternativeTranslations
    );
  }
}

module.exports = new TranslatorParser();
