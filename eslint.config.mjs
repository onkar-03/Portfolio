import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**'],
  },
  // Configs from FlatCompat carry no `files` key, and ESLint 9 only lints
  // .js/.mjs/.cjs by default — so without this the whole project reports as
  // "ignored". Scoping them to .jsx is what actually makes linting run.
  ...compat.extends('next/core-web-vitals').map((config) => ({
    ...config,
    files: ['**/*.{js,mjs,jsx}'],
  })),
];

export default eslintConfig;
