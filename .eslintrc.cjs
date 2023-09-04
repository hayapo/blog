module.exports = {
  extends: ["plugin:astro/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    extraFileExtensions: [".astro"],
    project: "./tsconfig.eslint.json",
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        ecmaVersion: "latest",
      },
      rules: {},
    },
  ],
};
