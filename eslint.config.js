const coreWebVitals = require("eslint-config-next/core-web-vitals");
const unusedImports = require("eslint-plugin-unused-imports");

module.exports = [
  ...coreWebVitals,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "no-console": "warn",
      "unused-imports/no-unused-imports": "warn",
    },
  },
];
