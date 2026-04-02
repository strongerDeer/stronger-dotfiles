/**
 * commitlint 기본 설정 (dotfiles base)
 * - project-init 실행 시 프로젝트 루트에 .commitlintrc.js로 복사됨
 */
const COMMIT_TYPES = [
  '✨ Feat',
  '⚡ Perf',
  '🐛 Fix',
  '🎨 UI/UX',
  '💄 Style',
  '➕ Add',
  '♻️ Refactor',
  '🔧 Chore',
  '🏗️ Build',
  '👷 CI',
  '📝 Docs',
  '🔥 Remove',
  '🔍 SEO',
  '🚧 WIP',
  '♿ A11y',
  '🧪 Test',
  '🚚 Move',
  '✏ Edit',
  '🚨 Linter',
  '🔀 Merge',
];

const EMOJIS = COMMIT_TYPES.map((type) => type.split(' ')[0]).join('|');
const TYPE_NAMES = COMMIT_TYPES.map((type) => type.split(' ')[1]).join('|');

module.exports = {
  rules: {
    'type-enum': [2, 'always', COMMIT_TYPES],
    'type-case': [0],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'sentence-case'],
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
            hasGitmoji ? '' : '커밋 메시지는 gitmoji로 시작해야 합니다 (예: ✨ Feat:, 🐛 Fix:)',
          ];
        },
        'type-format': (parsed) => {
          const typePattern = new RegExp(`^(${EMOJIS})\\s+(${TYPE_NAMES}):`);
          const hasCorrectFormat = typePattern.test(parsed.raw);
          return [
            hasCorrectFormat,
            hasCorrectFormat ? '' : '타입 형식이 올바르지 않습니다 (예: ✨ Feat:, 🐛 Fix:)',
          ];
        },
      },
    },
  ],
};
