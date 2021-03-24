module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['standard', 'eslint:recommended', 'plugin:vue/recommended'],
  plugins: ['vue'],
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off'
  }
};
