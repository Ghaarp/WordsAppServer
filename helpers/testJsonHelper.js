const fs = require("fs");

class TestJsonHelper {
  async readTestFile() {
    const fileResult = fs.readFileSync("exampleAuto.json", "utf8");
    return JSON.parse(fileResult);
  }

  writeTestFile(content) {
    fs.writeFileSync("exampleAuto.json", content);
  }
}

module.exports = new TestJsonHelper();
