/**
 * Commitizen 기본 설정 (dotfiles base)
 * - project-init 실행 시 프로젝트 루트에 .cz-config.js로 복사됨
 * - 타입 목록은 configs/commit-types.js에서 단일 관리
 */
const COMMIT_TYPES = require(`${process.env.DOTFILES}/configs/commit-types`);

module.exports = {
  types: COMMIT_TYPES.map(({ emoji, type, desc }) => ({
    value: `${emoji} ${type}`,
    name: `${emoji} ${type}: ${desc}`,
  })),

  messages: {
    type: '커밋 타입을 선택하세요:',
    subject: '커밋 제목을 입력하세요 (명령조, 첫글자 대문자, 마침표 X):\n',
    body: '상세 설명 (Enter=스킵, 긴 내용은 "git commit"으로 작성):\n',
    footer:
      'Jira 티켓과 스마트 커밋 (선택사항):\n  예: PROJ-123 #comment 작업 완료 #time 2h\n  명령어: #comment [내용], #time [시간]\n',
    confirmCommit: '위 내용으로 커밋하시겠습니까?',
  },

  allowCustomScopes: false,
  allowBreakingChanges: [],
  skipQuestions: ['scope', 'breaking'],

  subjectLimit: 100,
  footerPrefix: '',

  // 커밋 메시지 포맷: 헤더 → (빈줄) → body → (빈줄) → footer
  formatCommit: function (answers) {
    const type = answers.type;
    const subject = answers.subject;
    const body = answers.body ? answers.body.trim() : '';
    const footer = answers.footer ? answers.footer.trim() : '';

    let message = `${type}: ${subject}`;

    if (body) {
      message += '\n\n' + body;
    }

    if (footer) {
      message += '\n\n' + footer;
    }

    return message;
  },
};
