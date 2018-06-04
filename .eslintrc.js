const path = require("path")

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: ["prettier", "airbnb-base"],
  plugins: [
    "import",
  ],
  rules: {
    eqeqeq: "warn",
    "no-shadow": [2, {allow: ["state"]}],
    "no-param-reassign": [2, {props: false}],
    "function-paren-newline": [2, "never"],
    "object-curly-spacing": [2, "never"],
    "object-curly-newline": ["warn", {
      "ObjectExpression": {"consistent": true},
      "ObjectPattern": "never",
    }],
    "import/no-extraneous-dependencies": "off",
    "prefer-destructuring": ["error", {
      "array": false,
      "object": true
    }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
  },
}
