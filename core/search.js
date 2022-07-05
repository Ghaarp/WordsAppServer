const googleImages = require("google-images");
const testJsonHelper = require("../helpers/testJsonHelper");

const client = new googleImages(
  process.env.GOOGLE_CSE_ID,
  process.env.GOOGLE_API_KEY
);

class Search {
  static async searchExpressionInfo(expression) {
    const type = 1;

    if (type == 0) {
      const result = await client.search(expression);
      return result;
    }
    return await testJsonHelper.readTestFile();
    //client.search(expression).then((img) => {
    //  //testJsonHelper.writeTestFile(JSON.stringify(img));
    //return img;
    //});
    //Temporary real search disabled, using saved json for development
    //
  }
}

module.exports = Search;
