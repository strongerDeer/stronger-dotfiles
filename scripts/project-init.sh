#!/bin/bash
# 새 프로젝트에 dotfiles base config 설치
# 사용법: project-init (shell 함수로 등록됨)
# [변경] 중간 단계에서 실패해도 스크립트가 계속 실행되는 문제 방지
set -e

DOTFILES="${DOTFILES:-$HOME/dotfiles}"
PROJECT_DIR="$(pwd)"

# [변경] $DOTFILES가 없는 상태(setup.sh 미실행 또는 source ~/.zshrc 누락)에서
#        실행하면 모든 cp 명령이 조용히 실패하므로 초기에 명시적으로 검증
if [ ! -d "$DOTFILES" ]; then
  echo "❌ DOTFILES 디렉토리를 찾을 수 없습니다: $DOTFILES"
  echo "   setup.sh를 먼저 실행하고 'source ~/.zshrc'를 적용해 주세요."
  exit 1
fi

echo "▶️  프로젝트 초기화: $PROJECT_DIR"
echo ""

# ─── .prettierrc.js ───────────────────────────────────────────
if [ ! -f ".prettierrc.js" ]; then
  cat > .prettierrc.js << 'EOF'
/** @type {import("prettier").Config} */
const base = require(`${process.env.DOTFILES}/configs/lint/prettier.js`);

module.exports = {
  ...base,
  // 프로젝트 전용 오버라이드 (필요 시 추가)
};
EOF
  echo "  ✅ .prettierrc.js"
else
  echo "  ⏭️  .prettierrc.js (이미 존재)"
fi

# ─── eslint.config.mjs ────────────────────────────────────────
if [ ! -f "eslint.config.mjs" ]; then
  cp "$DOTFILES/configs/lint/eslint.mjs" eslint.config.mjs
  echo "  ✅ eslint.config.mjs"
else
  echo "  ⏭️  eslint.config.mjs (이미 존재)"
fi

# ─── .vscode/settings.json ────────────────────────────────────
if [ ! -f ".vscode/settings.json" ]; then
  mkdir -p .vscode
  cp "$DOTFILES/configs/vscode/settings.json" .vscode/settings.json
  echo "  ✅ .vscode/settings.json"
else
  echo "  ⏭️  .vscode/settings.json (이미 존재)"
fi

# ─── .commitlintrc.js ─────────────────────────────────────────
if [ ! -f ".commitlintrc.js" ]; then
  cp "$DOTFILES/configs/commit/commitlint.js" .commitlintrc.js
  echo "  ✅ .commitlintrc.js"
else
  echo "  ⏭️  .commitlintrc.js (이미 존재)"
fi

# ─── .nvmrc ───────────────────────────────────────────────────
if [ ! -f ".nvmrc" ]; then
  cp "$DOTFILES/configs/node/.nvmrc" .nvmrc
  echo "  ✅ .nvmrc (Node $(cat "$DOTFILES/configs/node/.nvmrc" | tr -d '\n'))"
else
  echo "  ⏭️  .nvmrc (이미 존재)"
fi

# ─── .gitignore ───────────────────────────────────────────────
if [ ! -f ".gitignore" ]; then
  cp "$DOTFILES/configs/git/.gitignore" .gitignore
  echo "  ✅ .gitignore"
else
  echo "  ⏭️  .gitignore (이미 존재)"
fi

# ─── .cz-config.js (Commitizen) ───────────────────────────────
if [ ! -f ".cz-config.js" ]; then
  cp "$DOTFILES/configs/commit/commitizen.js" .cz-config.js
  echo "  ✅ .cz-config.js"
else
  echo "  ⏭️  .cz-config.js (이미 존재)"
fi

# ─── .gitmessage ──────────────────────────────────────────────
if [ ! -f ".gitmessage" ]; then
  cp "$DOTFILES/git/.gitmessage" .gitmessage
  echo "  ✅ .gitmessage"
else
  echo "  ⏭️  .gitmessage (이미 존재)"
fi

# ─── .husky/ hooks ────────────────────────────────────────────
if [ ! -d ".husky" ]; then
  mkdir -p .husky
  cp "$DOTFILES/configs/lint/hooks/pre-commit" .husky/pre-commit
  cp "$DOTFILES/configs/commit/hooks/commit-msg" .husky/commit-msg
  cp "$DOTFILES/configs/commit/hooks/prepare-commit-msg" .husky/prepare-commit-msg
  chmod +x .husky/pre-commit .husky/commit-msg .husky/prepare-commit-msg
  echo "  ✅ .husky/ (pre-commit, commit-msg, prepare-commit-msg)"
else
  echo "  ⏭️  .husky/ (이미 존재)"
fi

# ─── scripts/validate-commit-msg.js ──────────────────────────
if [ ! -f "scripts/validate-commit-msg.js" ]; then
  mkdir -p scripts
  cp "$DOTFILES/scripts/validate-commit-msg.js" scripts/validate-commit-msg.js
  echo "  ✅ scripts/validate-commit-msg.js"
else
  echo "  ⏭️  scripts/validate-commit-msg.js (이미 존재)"
fi

# ─── .github/ (PR 템플릿 + Jira 워크플로우) ──────────────────
# Jira 연동 워크플로우는 선택사항 (--jira 플래그로 설치)
if [ "${WITH_JIRA:-false}" = "true" ]; then
  if [ ! -f ".github/PULL_REQUEST_TEMPLATE.md" ]; then
    mkdir -p .github/workflows
    cp "$DOTFILES/configs/github/PULL_REQUEST_TEMPLATE.md" .github/PULL_REQUEST_TEMPLATE.md
    cp "$DOTFILES/configs/github/workflows/jira-pr-merged.yml" .github/workflows/jira-pr-merged.yml
    cp "$DOTFILES/configs/github/workflows/create-jira-only.yml" .github/workflows/create-jira-only.yml
    echo "  ✅ .github/ (PR 템플릿 + Jira 워크플로우)"
    echo "     ⚠️  GitHub Secrets 설정 필요: JIRA_BASE_URL, JIRA_API_TOKEN, JIRA_USER_EMAIL, JIRA_PROJECT"
  else
    echo "  ⏭️  .github/ (이미 존재)"
  fi
fi

echo ""
echo "✅ 프로젝트 초기화 완료!"
echo ""
echo "다음 단계:"
echo "  1. ESLint 패키지 설치 (필요 시):"
echo "     npm install -D eslint typescript-eslint @eslint/js \\"
echo "       eslint-plugin-react eslint-plugin-react-hooks \\"
echo "       eslint-plugin-import eslint-plugin-simple-import-sort \\"
echo "       eslint-plugin-prettier eslint-config-prettier"
echo ""
echo "  2. Prettier 패키지 설치 (필요 시):"
echo "     npm install -D prettier"
echo ""
echo "  3. Commitizen + Husky 패키지 설치 (필요 시):"
echo "     npm install -D husky commitizen cz-customizable @commitlint/cli @commitlint/config-conventional"
echo "     npx husky install"
echo ""
echo "  4. package.json에 아래 항목 추가 (필요 시):"
echo '     "scripts": { "commit": "cz", "prepare": "husky || exit 0" }'
echo '     "config": { "commitizen": { "path": "cz-customizable" } }'
echo ""
echo "  5. Jira 워크플로우 설치 (선택사항):"
echo "     WITH_JIRA=true project-init"
