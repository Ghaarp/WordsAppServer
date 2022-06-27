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
    const indexableItems = definitionsGroup[1].map((definition) => {
      return this.parseDefinition(definition);
    });
    return { type, indexableItems };
  }

  parseDefinition(definition) {
    if (!definition) return;
    let meaning;
    let expression;
    let tags;
    let synonymGroups;

    if (definition[0] && definition.length > 0) meaning = definition[0];

    if (definition[1] && definition.length > 1) expression = definition[1];

    if (definition[4] && definition.length > 4)
      tags = this.parseTags(definition[4]);

    if (definition[5] && definition.length > 5)
      synonymGroups = definition[5].map((synonymGroup) => {
        return this.parseSynonymGroup(synonymGroup);
      });

    return { meaning, expression, tags, synonymGroups };
  }

  parseTags(tags) {
    return tags.map((tag) => {
      if (tag && tag.length > 0 && tag[0]) return { tag: tag[0] };
    });
  }

  parseSynonymGroup(synonymGroup) {
    if (!synonymGroup || synonymGroup.length == 0) return;

    const items = synonymGroup[0].map((synonym) => {
      if (synonym && synonym.length > 0 && synonym[0]) {
        return { synonym: synonym[0] };
      }
    });

    if (synonymGroup.length < 2) return { items };

    const tags = this.parseTags(synonymGroup[1]);

    return { items, tags };
  }
}

module.exports = new DefinitionParser();
