class DefinitionParser {
  //data[1][0]
  extractDefinitions(data) {
    if (
      !data ||
      data.length == 0 ||
      !data[1] ||
      data[1].length == 0 ||
      !data[1][0] ||
      data[1][0].length == 0
    )
      return;

    const parseData = data[1][0];
    let result = [];
    parseData.forEach((item) => {
      if (!item || item.length < 2 || !item[1]) return;
      const type = item[0];
      const items = item[1].map((example) => {
        if (!example) return;
        let definition;
        let expression;
        let synonyms;

        if (example.length > 0) definition = example[0];

        if (example.length > 1) expression = example[1];

        if (example.length > 5)
          synonyms = example[5].forEach((synonymGroup) => {});

        console.log("test");
        return { definition, expression, synonyms };
      });
      result.push({ type, items });
    });

    console.log(result);
    return result;
  }
}

module.exports = new DefinitionParser();
