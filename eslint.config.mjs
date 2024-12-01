import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser'; // Import the TypeScript parser
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],

    // Language options
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
      parser: tsParser, // Pass the actual parser object
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    // Plugins
    plugins: {
      prettier: pluginPrettier,
      react: pluginReact,
      '@typescript-eslint': tseslint,
    },

    // Rules
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      'prettier/prettier': 'error', // Enable Prettier as an ESLint rule
    },

    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },

  {
    files: [
      '**/__tests__/**/*.{js,mjs,cjs,ts,jsx,tsx}',
      '**/*.{spec,test}.{js,mjs,cjs,ts,jsx,tsx}',
    ],
    languageOptions: {
      globals: {
        ...globals.jest, // Add Jest globals for test files
      },
    },
  },
  // Prettier configuration
  prettierConfig,
];
