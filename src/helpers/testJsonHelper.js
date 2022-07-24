const fs = require("fs");

class TestJsonHelper {
  async readTestFile() {
    const fileResult = fs.readFileSync("src/exampleAuto.json", "utf8");
    return JSON.parse(fileResult);
  }

  writeTestFile(content) {
    fs.writeFileSync("exampleAutoTranslate2.json", content);
  }
}

module.exports = new TestJsonHelper();
