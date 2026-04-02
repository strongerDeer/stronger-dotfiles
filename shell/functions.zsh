# dotfiles shell 함수 모음
# setup.sh에 의해 ~/.zshrc에서 source됨

# 새 프로젝트에 dotfiles base config 설치
project-init() {
  bash "$DOTFILES/scripts/project-init.sh"
}

# ─── GitHub + Jira 연동 ───────────────────────────────────────

# 현재 브랜치의 Jira 티켓 브라우저에서 열기
# 사용: jira-open
jira-open() {
  local ticket
  ticket=$(git symbolic-ref --short HEAD 2>/dev/null | grep -oE '[A-Z]+-[0-9]+')
  if [ -z "$ticket" ]; then
    echo "❌ 브랜치명에서 Jira 티켓 번호를 찾을 수 없습니다."
    echo "   예: feature/PROJ-123-login-form"
    return 1
  fi
  local base_url="${JIRA_BASE_URL:-https://your-company.atlassian.net}"
  echo "🔗 $ticket 열기..."
  open "$base_url/browse/$ticket"
}

# ─── 배포 상태 확인 ──────────────────────────────────────────

# AWS Amplify 최신 배포 상태 확인 (페이지 접속 없이)
# 사용: amplify-status
# 사전 설정: AMPLIFY_APP_ID, AMPLIFY_BRANCH 환경변수 설정 필요
amplify-status() {
  local app_id="${AMPLIFY_APP_ID}"
  local branch="${AMPLIFY_BRANCH:-main}"
  if [ -z "$app_id" ]; then
    echo "❌ AMPLIFY_APP_ID 환경변수를 설정해주세요."
    return 1
  fi
  aws amplify list-jobs \
    --app-id "$app_id" \
    --branch-name "$branch" \
    --max-results 1 \
    --query 'jobSummaries[0].{status:status,commit:commitMessage,time:startTime}' \
    --output table
}

# Jenkins 최신 빌드 상태 확인 (페이지 접속 없이)
# 사용: jenkins-status [job명]
# 사전 설정: JENKINS_URL, JENKINS_JOB, JENKINS_USER, JENKINS_TOKEN 환경변수 설정 필요
jenkins-status() {
  local job="${1:-${JENKINS_JOB}}"
  local url="${JENKINS_URL}"
  if [ -z "$url" ] || [ -z "$job" ]; then
    echo "❌ JENKINS_URL, JENKINS_JOB 환경변수를 설정해주세요."
    return 1
  fi
  local result
  result=$(curl -s --user "${JENKINS_USER}:${JENKINS_TOKEN}" \
    "$url/job/$job/lastBuild/api/json" \
    | python3 -c "
import sys, json
d = json.load(sys.stdin)
print(f\"상태: {d.get('result', '진행중')}  빌드: #{d.get('number')}  커밋: {d.get('displayName')}\")
" 2>/dev/null)
  echo "${result:-❌ Jenkins 응답 없음 (URL/인증 확인 필요)}"
}
