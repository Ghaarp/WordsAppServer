class TranslationsParser {
  extractTranslations(data) {
    const result = data.map((synonymGroup) => {
      const group = this.parseTranslationGroup(synonymGroup);
      if (group) return group;
    });
    return result;
  }

  parseTranslationGroup(translationGroup) {
    if (!translationGroup || translationGroup.length < 2) return;

    const type = translationGroup[0];
    const indexableItems = this.parseTranslations(translationGroup[1]);

    return { translations: { type, indexableItems } };
  }

  parseTranslations(translations) {
    return translations.map((translation) => {
      if (!translation || translation.length < 4) return;
      const value = translation[0];
      const rarity = translation[3];
      const synonymGroups = [
        {
          items: translation[2].map((item) => {
            return { synonym: item };
          }),
        },
      ];

      return { value, rarity, synonymGroups };
    });
  }
}

module.exports = new TranslationsParser();
