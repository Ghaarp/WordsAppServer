//.raw[3][1] - definitions
//.raw[3][1][0][x][0] - type
//.raw[3][1][0][x][1] - definitions ... [x][0] - explanation [x][1] - example

class DefinitionParser {
  //data[1][0]
  extractDefinitions(data) {
    let result = [];
    data.forEach((definitionsGroup) => {
      result.push(this.parseDefinitionsGroup(definitionsGroup));
    });

    return result;
  }

  parseDefinitionsGroup(definitionsGroup) {
    if (
      !definitionsGroup ||
      definitionsGroup.length < 2 ||
      !definitionsGroup[1]
    )
      return;
    const type = definitionsGroup[0];
    const items = definitionsGroup[1].map((definition) => {
      return this.parseDefinition(definition);
    });
    return { type, items };
  }

  parseDefinition(definition) {
    if (!definition) return;
    let value;
    let expression;
    let tags;
    let synonyms;

    if (definition[0] && definition.length > 0) value = definition[0];

    if (definition[1] && definition.length > 1) expression = definition[1];

    if (definition[4] && definition.length > 4)
      tags = this.parseTags(definition[4]);

    if (definition[5] && definition.length > 5)
      synonyms = definition[5].map((synonymGroup) => {
        return this.parseSynonymGroup(synonymGroup);
      });

    return { value, expression, tags, synonyms };
  }

  parseTags(tags) {
    return tags.map((tag) => {
      if (tag && tag.length > 0 && tag[0]) return tag[0];
    });
  }

  parseSynonymGroup(synonymGroup) {
    if (!synonymGroup || synonymGroup.length == 0) return;

    const synonyms = synonymGroup[0].map((synonym) => {
      if (synonym && synonym.length > 0 && synonym[0]) {
        return synonym[0];
      }
    });

    if (synonymGroup.length < 2) return { synonyms };

    const tags = this.parseTags(synonymGroup[1]);

    return { synonyms, tags };
  }
}

module.exports = new DefinitionParser();
