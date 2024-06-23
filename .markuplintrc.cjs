module.exports = {
  parser: {
    parser: {
      ".astro$": "@markuplint/astro-parser",
    },
  },
  extends: ["markuplint:recommended"],
  rules: {
    "character-reference": false,
  },
};
