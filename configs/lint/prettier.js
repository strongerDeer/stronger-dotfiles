/**
 * Prettier 기본 설정 (dotfiles base)
 * - 모든 프로젝트에서 공통 적용
 * - 프로젝트별 .prettierrc.js에서 spread 후 오버라이드
 */
module.exports = {
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80,
  arrowParens: 'always',
  endOfLine: 'lf',
  bracketSpacing: true,
  useTabs: false,
  bracketSameLine: false,

  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: '*.{css,scss}',
      options: {
        singleQuote: false,
        tabWidth: 2,
      },
    },
  ],
};
