module.exports = {
  env: {
    "browser": true,
    "es2021": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  ignorePatterns: [
    'e2e',
    'src/**/test.ts',
    'src/**/main.ts',
    'src/**/polyfills.ts',
    '*.js',
    '*.json',
    '*.scss',
    '*.md',
  ],
  parserOptions: {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-extra-semi": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/require-await": "error",
  }
};
