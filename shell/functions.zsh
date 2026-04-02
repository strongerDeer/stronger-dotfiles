# dotfiles shell 함수 모음
# setup.sh에 의해 ~/.zshrc에서 source됨

# 새 프로젝트에 dotfiles base config 설치
project-init() {
  bash "$DOTFILES/scripts/project-init.sh"
}
