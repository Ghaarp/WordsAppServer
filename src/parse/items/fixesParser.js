class FixesParser {
  extractFix(data) {
    return data?.from?.text?.didYouMean ? data?.from?.text?.value : undefined;
  }
}

module.exports = new FixesParser();
