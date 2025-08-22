module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  plugins: [
    'html'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script'
  },
  rules: {
    'indent': ['error', 4],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'warn'
  },
  settings: {
    'html/html-extensions': ['.html'],
    'html/xml-extensions': ['.xml'],
    'html/indent': '0'
  },
  overrides: [
    {
      files: ['*.html'],
      processor: 'html/extract-script'
    }
  ]
};
