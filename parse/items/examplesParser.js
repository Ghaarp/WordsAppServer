class ExamplesParser {
  extractExamples(data) {
    return data.map((item) => {
      if (!item || item.length == 0) return;
      const source = item[0];

      let example;
      if (item.length > 1) example = item[1];

      return { source, example };
    });
  }
}

module.exports = new ExamplesParser();
