module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "latest",
    },
    "import/extensions": [".js", ".jsx"],
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
      },
    },
    "import/external-module-folders": ["node_modules"],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "import", "mui-unused-classes", "sonarjs"],
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:sonarjs/recommended",
  ],
  rules: {
    "sonarjs/no-identical-functions": 0,
    "sonarjs/cognitive-complexity": 0,
    "sonarjs/no-duplicate-string": 0,
    "no-floating-decimal": 2,
    "no-empty-function": 2,
    "no-else-return": 2,
    curly: 2,
    "no-extra-boolean-cast": 2,
    "no-undef": 2,
    "react/prop-types": "off",
    "react/display-name": "off",
    "no-dupe-keys": "error",
    "mui-unused-classes/unused-classes": 2,
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@material-ui/*/*/*", "!@material-ui/core/test-utils/*"],
      },
    ],
    "no-console": 2,
  },
};
