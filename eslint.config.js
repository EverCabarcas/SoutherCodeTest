import prettierConfig from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      'node_modules/',
      'build/',
      'dist/',
      'logs/',
      '*.log',
      '.env',
      'coverage/',
      'public/',
      '.eslintcache',
    ],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        node: true,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          tabWidth: 2,
          printWidth: 80,
          endOfLine: 'auto',
        },
      ],
      'no-console': 'off',
      'no-unused-vars': 'warn',
      'no-shadow': 'off',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
]
