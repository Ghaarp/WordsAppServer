const googleImages = require("google-images");

const client = new googleImages(
  process.env.GOOGLE_CSE_ID,
  process.env.GOOGLE_API_KEY
);

class Search {
  static async searchExpressionInfo(expression) {
    return await client.search(expression);
  }
}

module.exports = Search;
