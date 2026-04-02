#!/bin/bash
# dotfiles 초기 설정 스크립트
# 새 PC에서 한 번만 실행하면 됩니다.
# 사용법: ./setup.sh

DOTFILES_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "▶️  Dotfiles 연동 시작..."
echo ""

# ─── Claude 설정 ──────────────────────────────────────────────
mkdir -p ~/.claude
ln -sf "$DOTFILES_DIR/claude/CLAUDE.md" ~/.claude/CLAUDE.md
echo "  ✅ claude/CLAUDE.md → ~/.claude/CLAUDE.md"

# ─── Git 전역 설정 ────────────────────────────────────────────
ln -sf "$DOTFILES_DIR/git/.gitignore_global" ~/.gitignore_global
git config --global core.excludesfile ~/.gitignore_global
echo "  ✅ git/.gitignore_global → ~/.gitignore_global (전역 gitignore)"

ln -sf "$DOTFILES_DIR/git/.gitmessage" ~/.gitmessage
git config --global commit.template ~/.gitmessage
echo "  ✅ git/.gitmessage → ~/.gitmessage (커밋 템플릿)"

# ─── 환경변수 & shell 함수 (.zshrc) ───────────────────────────
ZSHRC="$HOME/.zshrc"

# DOTFILES 환경변수 등록
if ! grep -q "DOTFILES=" "$ZSHRC" 2>/dev/null; then
  echo "" >> "$ZSHRC"
  echo "# dotfiles" >> "$ZSHRC"
  echo "export DOTFILES=\"$DOTFILES_DIR\"" >> "$ZSHRC"
  echo "  ✅ DOTFILES 환경변수 → ~/.zshrc"
else
  echo "  ⏭️  DOTFILES 환경변수 (이미 등록됨)"
fi

# shell 함수 (project-init) 등록
if ! grep -q "functions.zsh" "$ZSHRC" 2>/dev/null; then
  echo "source \"\$DOTFILES/shell/functions.zsh\"" >> "$ZSHRC"
  echo "  ✅ shell/functions.zsh → ~/.zshrc (project-init 함수)"
else
  echo "  ⏭️  shell/functions.zsh (이미 등록됨)"
fi

echo ""
echo "✅ Dotfiles 연동 완료!"
echo ""
echo "적용하려면:"
echo "  source ~/.zshrc"
echo ""
echo "이후 새 프로젝트 폴더에서:"
echo "  project-init"
