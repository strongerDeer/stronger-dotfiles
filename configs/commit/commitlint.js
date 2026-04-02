/**
 * commitlint 기본 설정 (dotfiles base)
 * - project-init 실행 시 프로젝트 루트에 .commitlintrc.js로 복사됨
 * - 타입 목록은 configs/commit/types.js에서 단일 관리
 */
const COMMIT_TYPES = require(`${process.env.DOTFILES}/configs/commit/types`);

const TYPE_LIST = COMMIT_TYPES.map(({ emoji, type }) => `${emoji} ${type}`);
const EMOJIS = COMMIT_TYPES.map(({ emoji }) => emoji).join('|');
const TYPE_NAMES = COMMIT_TYPES.map(({ type }) => type).join('|');

module.exports = {
  rules: {
    'type-enum': [2, 'always', TYPE_LIST],
    'type-case': [0],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [0],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 200],
    'body-max-line-length': [2, 'always', 200],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 250],
    'gitmoji-required': [2, 'always'],
    'type-format': [2, 'always'],
  },

  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        `^((?:${EMOJIS})\\s+(?:${TYPE_NAMES})):\\s(.+)$`
      ),
      headerCorrespondence: ['type', 'subject'],
    },
  },

  plugins: [
    {
      rules: {
        'gitmoji-required': (parsed) => {
          const gitmojiPattern = new RegExp(`^(${EMOJIS})\\s+`);
          const hasGitmoji = gitmojiPattern.test(parsed.raw);
          return [
            hasGitmoji,
            hasGitmoji
              ? ''
              : '커밋 메시지는 gitmoji로 시작해야 합니다 (예: ✨ Feat:, 🐛 Fix:)',
          ];
        },
        'type-format': (parsed) => {
          const typePattern = new RegExp(`^(${EMOJIS})\\s+(${TYPE_NAMES}):`);
          const hasCorrectFormat = typePattern.test(parsed.raw);
          return [
            hasCorrectFormat,
            hasCorrectFormat
              ? ''
              : '타입 형식이 올바르지 않습니다 (예: ✨ Feat:, 🐛 Fix:)',
          ];
        },
      },
    },
  ],
};
