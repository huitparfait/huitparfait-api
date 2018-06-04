module.exports = {
  'extends': 'standard',
  'plugins': [
    'sort-requires',
  ],
  'rules': {
    'arrow-parens': ['error', 'always'],
    'brace-style': ['error', 'stroustrup'],
    'comma-dangle': ['error', 'always-multiline'],
    'line-comment-position': ['error', { 'position': 'above' }],
    'padded-blocks': 'off',
    'semi': ['error', 'always'],
    'sort-requires/sort-requires': 'error',
  },
};
