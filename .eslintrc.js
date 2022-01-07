module.exports = {
  'env': {
    'es2021': true,
    'node': true
  },
  'extends': ['airbnb-base'],
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'one-var': [
      'error',
      'never'
    ],
    'one-var-declaration-per-line': [
      'error',
      'always'
    ],
    'no-trailing-spaces': [
      'error'
    ]
  }
}
