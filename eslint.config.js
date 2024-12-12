import path from 'path';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  ...tsEslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        parser: tsParser,
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'off',
        { argsIgnorePattern: '^_[^_].*.*$|^_$', varsIgnorePattern: '^_[^_].*.*$|^_$', caughtErrorsIgnorePattern: '^_[^_].*.*$|^_$' }
      ],

      'import/prefer-default-export': 'off',
      curly: ['error', 'all']
    }
  },
  {
    files: ['**/*.{js,jsx,cjs,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    ignores: ['**/*.config.js', 'dist', 'node_modules', '.config', '*.test.*', '**/*.d.ts']
  }
];
