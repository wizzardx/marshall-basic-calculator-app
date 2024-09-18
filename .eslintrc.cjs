module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "error",
  },
  overrides: [
    {
      files: [".eslintrc.cjs", "vite.config.ts", "playwright.config.ts"],
      env: {
        node: true,
      },
    },
  ],
};
