import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReactConfig,
  {
    plugins: {
      react: pluginReact
    },
    settings: {
      react: {
        version: 'detect' // Reactのバージョンを自動検出
      }
    },
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  }
];
