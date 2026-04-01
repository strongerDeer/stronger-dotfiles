#!/bin/bash

DOTFILES_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "▶️ Dotfiles 연동 시작..."

# Claude 설정 연동
mkdir -p ~/.claude
ln -sf "$DOTFILES_DIR/claude/CLAUDE.md" ~/.claude/CLAUDE.md
echo "  claude/CLAUDE.md -> ~/.claude/CLAUDE.md"

echo ""
echo "✅ Dotfiles 연동 완료!"
