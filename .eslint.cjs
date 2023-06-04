/** @type {import("eslint").Linter.Config} */
const config = {
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  extends: ['@naporin0624/eslint-config'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.dev.ts',
          '**/*.test.ts',
          '**/*.test.tsx',
          './*.config.js',
          './*.config.cjs',
          './*.config.mjs',
          '**/*.dev.mjs',
          './*.config.ts',
          '**/*.stories.tsx',
          '**/*.story.tsx',
          'vitest-*',
        ],
      },
    ],
    'no-restricted-imports': [
      'off',
      {
        patterns: ['../*'],
      },
    ],
    'no-console': 'warn',
  },
}

module.exports = config
