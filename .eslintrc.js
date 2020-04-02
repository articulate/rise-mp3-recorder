module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    worker: true
  },
  extends: 'eslint:recommended',
  ignorePatterns: [ 'build/' ],
  globals: {
    'lamejs': 'readonly'
  },
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'array-bracket-spacing': ['error', 'always'],
    'camelcase': 'error',
    'comma-dangle': ['error', 'never'],
    'global-require': 'error',
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'no-console': 0,
    'no-duplicate-imports': 'error',
    'no-eq-null': 'error',
    'no-extra-parens': 'error',
    'no-restricted-globals': ['error', 'event'],
    'no-template-curly-in-string': 'error',
    'no-trailing-spaces': 'error',
    'no-useless-constructor': 'error',
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'semi': ['error', 'never']
  }
}
