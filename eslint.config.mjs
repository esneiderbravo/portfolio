import nextVitals from 'eslint-config-next/core-web-vitals'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-config-prettier'

const config = [
  { ignores: ['.github/**', '.claude/**', 'openspec/**'] },
  ...nextVitals,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      ...tseslint.configs['recommended-type-checked'].rules,
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  prettier,
]

export default config
