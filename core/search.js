const googleImages = require("google-images");
const testJsonHelper = require("../helpers/testJsonHelper");

const client = new googleImages(
  process.env.GOOGLE_CSE_ID,
  process.env.GOOGLE_API_KEY
);

class Search {
  static async searchExpressionInfo(expression) {
    //client.search("chicken").then((img) => {
    //  //testJsonHelper.writeTestFile(JSON.stringify(img));
    //  return img;
    //});
    //Temporary real search disabled, using saved json for development
    return await testJsonHelper.readTestFile();
  }
}

module.exports = Search;
