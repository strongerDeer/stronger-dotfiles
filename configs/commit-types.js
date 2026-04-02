/**
 * 커밋 타입 단일 소스
 * - commitizen/base.js, commitlint/base.js 모두 이 파일을 참조
 * - 타입 추가/수정 시 이 파일만 변경하면 됨
 */
module.exports = [
  { emoji: '✨',  type: 'Feat',     desc: '새로운 기능 추가' },
  { emoji: '⚡',  type: 'Perf',     desc: '성능 개선(속도/메모리/용량)' },
  { emoji: '🐛',  type: 'Fix',      desc: '버그 수정' },
  { emoji: '🎨',  type: 'UI/UX',    desc: '사용자 인터페이스 변경' },
  { emoji: '💄',  type: 'Style',    desc: '코드 스타일 (비즈니스 로직 변경 없음)' },
  { emoji: '➕',  type: 'Add',      desc: '의존성 추가' },
  { emoji: '♻️', type: 'Refactor', desc: '코드 리팩토링' },
  { emoji: '🔧',  type: 'Chore',    desc: '기타 변경사항 (빌드 스크립트 등)' },
  { emoji: '🏗️', type: 'Build',    desc: '빌드 관련 파일 수정' },
  { emoji: '👷',  type: 'CI',       desc: 'CI 관련 설정 수정' },
  { emoji: '📝',  type: 'Docs',     desc: '문서 (추가, 수정, 삭제)' },
  { emoji: '🔥',  type: 'Remove',   desc: '코드/파일/기능 삭제' },
  { emoji: '🔍',  type: 'SEO',      desc: '검색 엔진 최적화' },
  { emoji: '🚧',  type: 'WIP',      desc: '작업 진행 중 (Work In Progress)' },
  { emoji: '♿',  type: 'A11y',     desc: '접근성 개선' },
  { emoji: '🧪',  type: 'Test',     desc: '테스트 (비즈니스 로직 변경 없음)' },
  { emoji: '🚚',  type: 'Move',     desc: '파일 및 폴더 이동' },
  { emoji: '✏',   type: 'Edit',     desc: '간단한 수정' },
  { emoji: '🚨',  type: 'Linter',   desc: '린트 에러 수정' },
  { emoji: '🔀',  type: 'Merge',    desc: '브랜치 병합' },
];
