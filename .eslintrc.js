const base = require("@mendix/pluggable-widgets-tools/configs/eslint.ts.base.json");

module.exports = {
    ...base,
    "rules": {
        // Note: you must disable the base rule as it can report incorrect errors
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn"
      }
};
