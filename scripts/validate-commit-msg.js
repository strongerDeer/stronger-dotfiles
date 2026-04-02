#!/usr/bin/env node
/**
 * Jira 스마트 커밋 감지 스크립트
 * - commit-msg 훅에서 호출됨
 * - Jira 이슈 키(ABC-123) 포함 여부를 감지해 안내만 표시 (커밋 차단 없음)
 */

const fs = require('fs');

const commitMsgFile = process.argv[2];

if (!commitMsgFile) {
  console.error('❌ 커밋 메시지 파일 경로가 필요합니다.');
  process.exit(1);
}

const commitMsg = fs.readFileSync(commitMsgFile, 'utf-8');

// Merge / Revert 커밋은 스킵
if (/^(Merge|Revert)/i.test(commitMsg)) {
  process.exit(0);
}

console.log('\n🔍 커밋 메시지 검증 중...\n');

const jiraKeyPattern = /\b([A-Z]+-\d+)\b/g;
const jiraKeys = commitMsg.match(jiraKeyPattern);

if (jiraKeys) {
  const uniqueKeys = [...new Set(jiraKeys)];
  console.log(`✅ Jira 이슈 키 발견: ${uniqueKeys.join(', ')}`);
  console.log('\n💡 이 커밋은 push 시 Jira에 자동으로 반영됩니다.');
  console.log('   - 커밋 링크가 Jira 이슈에 추가됩니다');
  console.log('   - Jira 공식 연동을 통해 스마트 커밋이 처리됩니다\n');
} else {
  console.log('⚠️  Jira 이슈 키가 없습니다 (선택사항)\n');
  console.log('💡 Jira 이슈 키 포함 예시:');
  console.log('   git commit -m "✨ Feat: 로그인 기능 구현 PROJ-123"');
  console.log('   git commit -m "🐛 Fix: API 연동 버그 수정 PROJ-456"\n');
  console.log('📚 자세한 사용법: npm run commit (인터랙티브 CLI)\n');
}

// 경고만 표시하고 커밋은 항상 허용
process.exit(0);
