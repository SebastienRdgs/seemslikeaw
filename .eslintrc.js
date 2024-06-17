module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended', 'plugin:vue/vue3-recommended'],
  plugins: [],
  rules: {
    'vue/v-on-event-hyphenation': 'off',
    'vue/attribute-hyphenation': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    'vue/no-multiple-template-root': 'off',
    'no-console': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 10,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/require-default-prop': 'off',
  },
};
