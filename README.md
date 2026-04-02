# stronger-dotfiles

개발 환경 설정을 PC 간에 일관되게 유지하기 위한 dotfiles 저장소입니다.

## 구조

```
dotfiles/
  configs/
    commit/
      types.js                   # 커밋 타입 단일 소스
      commitizen.js              # Commitizen 설정
      commitlint.js              # commitlint 설정
      hooks/
        commit-msg               # commitlint + Jira 스마트 커밋 감지
        prepare-commit-msg       # .gitmessage 템플릿 삽입
    lint/
      eslint.mjs                 # ESLint 기준 설정
      prettier.js                # Prettier 기준 설정
      hooks/
        pre-commit               # lint + type-check
    git/
      .gitignore                 # 프로젝트 gitignore 기준
    github/
      PULL_REQUEST_TEMPLATE.md   # PR 템플릿
      workflows/
        jira-pr-merged.yml       # PR 머지 시 Jira 티켓 자동 완료
        create-jira-only.yml     # 수동 Jira 이슈 생성
    node/
      .nvmrc                     # Node.js 기본 버전 (LTS)
    vscode/
      settings.json              # VS Code 기준 설정
  git/
    .gitignore_global            # 전역 gitignore (모든 프로젝트에 자동 적용)
    .gitmessage                  # 커밋 메시지 템플릿 (Jira 스마트 커밋 포함)
  scripts/
    project-init.sh              # 새 프로젝트 초기화 스크립트
    validate-commit-msg.js       # Jira 스마트 커밋 감지 스크립트
  shell/
    functions.zsh                # shell 함수 (project-init 명령어)
  claude/
    CLAUDE.md                    # Claude Code 글로벌 컨벤션
    skills/
      docs/                      # JSDoc/Storybook/README 자동화 (/docs)
      review/                    # 시니어 코드 리뷰 (/review)
      perf/                      # 성능 분석 + Lighthouse (/perf)
      jira/                      # Jira 자동화 (/jira)
      api/                       # Swagger → 타입/훅 자동 생성 (/api)
      ds/                        # 디자인 시스템 검증 (/ds)
      seo/                       # SEO 최적화 자동화 (/seo)
  setup.sh                       # 새 PC 연동 스크립트
```

---

## 새 PC 세팅 (최초 1회)

### 1. 저장소 가져오기

```
git init
git remote add origin git@github.com:strongerDeer/stronger-dotfiles.git
git pull origin main
```

### 2. 세팅 스크립트 실행

```bash
./setup.sh
```

아래 항목이 자동으로 설정됩니다.

| 항목                  | 설명                                             |
| --------------------- | ------------------------------------------------ |
| `~/.claude/CLAUDE.md` | Claude Code 글로벌 컨벤션 (심볼릭 링크)                     |
| `~/.claude/skills/`   | Claude 글로벌 스킬 8종 (심볼릭 링크)                        |
| `~/.gitignore_global` | 전역 gitignore (심볼릭 링크)                                 |
| `~/.gitmessage`       | 커밋 메시지 템플릿 (심볼릭 링크)                             |
| `~/.zshrc`            | `DOTFILES` 환경변수 + `project-init`, `jira-open` 등 명령어 등록 |

### 3. 적용

```bash
source ~/.zshrc
```

---

## 새 프로젝트 시작할 때

프로젝트 폴더에서 아래 명령어 한 번 실행하면 기준 설정 파일이 자동 생성됩니다.

```bash
project-init
```

생성되는 파일:

| 파일                              | 방식        | 설명                                        |
| --------------------------------- | ----------- | ------------------------------------------- |
| `.prettierrc.js`                  | 런타임 참조 | `$DOTFILES/configs/lint/prettier.js`를 참조 |
| `eslint.config.mjs`               | 복사        | base 설정 복사 후 프로젝트에서 수정 가능    |
| `.vscode/settings.json`           | 복사        | 저장 시 자동 포맷 + ESLint 수정             |
| `.commitlintrc.js`                | 복사        | 커밋 타입/이모지 규칙                       |
| `.cz-config.js`                   | 복사        | Commitizen 인터랙티브 커밋 CLI              |
| `.nvmrc`                          | 복사        | Node.js 기본 버전                           |
| `.gitignore`                      | 복사        | 공통 ignore 패턴                            |
| `.gitmessage`                     | 복사        | 커밋 메시지 템플릿 (prepare-commit-msg 훅에서 사용) |
| `.husky/pre-commit`               | 복사        | 커밋 전 lint + type-check                   |
| `.husky/commit-msg`               | 복사        | commitlint + Jira 스마트 커밋 감지          |
| `.husky/prepare-commit-msg`       | 복사        | .gitmessage 템플릿 자동 삽입                |
| `scripts/validate-commit-msg.js`  | 복사        | Jira 이슈 키 감지 스크립트                  |

> 이미 파일이 존재하면 덮어쓰지 않고 건너뜁니다.

### Jira 워크플로우 포함 설치

Jira 연동 GitHub Actions까지 함께 설치하려면 `WITH_JIRA=true`를 붙입니다.

```bash
WITH_JIRA=true project-init
```

추가로 생성되는 파일:

| 파일                                          | 설명                              |
| --------------------------------------------- | --------------------------------- |
| `.github/PULL_REQUEST_TEMPLATE.md`            | PR 템플릿                         |
| `.github/workflows/jira-pr-merged.yml`        | PR 머지 시 Jira 티켓 자동 완료    |
| `.github/workflows/create-jira-only.yml`      | 수동 Jira 이슈 생성 워크플로우    |

Jira 워크플로우 동작을 위해 GitHub Repository Secrets에 아래 항목을 등록해야 합니다.

| Secret 키          | 설명                            |
| ------------------ | ------------------------------- |
| `JIRA_BASE_URL`    | Jira 베이스 URL (예: `https://yourcompany.atlassian.net`) |
| `JIRA_API_TOKEN`   | Jira API 토큰                   |
| `JIRA_USER_EMAIL`  | Jira 계정 이메일                |
| `JIRA_PROJECT`     | Jira 프로젝트 키 (예: `PROJ`)   |

### Husky + Commitizen 패키지 설치

`project-init` 실행 후 패키지를 설치하고 `package.json`을 설정합니다.

```bash
npm install -D husky commitizen cz-customizable @commitlint/cli
npx husky install
```

`package.json`에 아래 항목을 추가합니다.

```json
{
  "scripts": {
    "commit": "cz",
    "prepare": "husky || exit 0"
  },
  "config": {
    "commitizen": {
      "path": "cz-customizable"
    }
  }
}
```

이후 `npm run commit`으로 인터랙티브 커밋 CLI를 사용할 수 있습니다.

---

## 프로젝트별 오버라이드

### Prettier

기준 설정을 상속하고 필요한 부분만 수정합니다.

```js
// .prettierrc.js
const base = require(`${process.env.DOTFILES}/configs/prettier/base.js`);

module.exports = {
  ...base,
  printWidth: 100, // 이 프로젝트는 100자로 오버라이드
};
```

### ESLint

`eslint.config.mjs`에 rules를 추가하거나 수정합니다.

```js
// eslint.config.mjs
rules: {
  // 기존 rules 유지하면서 추가
  'no-console': 'off', // 이 프로젝트는 console 허용
}
```

### VS Code

`.vscode/settings.json`에 워크스페이스 전용 설정을 추가합니다.

```json
{
  "editor.formatOnSave": true,
  "editor.rulers": [100]
}
```

---

## 커밋 컨벤션

| 타입          | 설명                         |
| ------------- | ---------------------------- |
| `✨ Feat`     | 새로운 기능 추가             |
| `🐛 Fix`      | 버그 수정                    |
| `♻️ Refactor` | 코드 리팩토링                |
| `📝 Docs`     | 문서 수정                    |
| `💄 Style`    | 코드 스타일 (로직 변경 없음) |
| `🎨 UI/UX`    | 사용자 인터페이스 변경       |
| `➕ Add`      | 의존성 추가                  |
| `🔥 Remove`   | 코드/파일 삭제               |
| `🔍 SEO`      | 검색 엔진 최적화             |
| `🔧 Chore`    | 기타 변경사항                |
| `🏗️ Build`    | 빌드 관련 수정               |
| `👷 CI`       | CI 설정 수정                 |
| `🧪 Test`     | 테스트                       |
| `🚧 WIP`      | 작업 진행 중                 |
| `🚚 Move`     | 파일/폴더 이동               |
| `⚡ Perf`     | 성능 개선                    |
| `♿ A11y`     | 접근성 개선                  |
| `✏ Edit`      | 간단한 수정                  |
| `🚨 Linter`   | 린트 에러 수정               |
| `🔀 Merge`    | 브랜치 병합                  |

**형식:**

```
✨ Feat: 로그인 기능 추가
```

---

## 설정 업데이트

base 설정을 수정한 경우:

```bash
cd ~/dotfiles
# 파일 수정 후
git add .
git commit -m "🔧 Chore: prettier base printWidth 조정"
git push
```

다른 PC에서 반영:

```bash
cd ~/dotfiles
git pull
```

> Prettier는 런타임 참조 방식이라 `git pull`만 해도 즉시 반영됩니다.
> ESLint 등 복사 방식 파일은 프로젝트에서 수동으로 업데이트해야 합니다.

---

## Shell 유틸리티

`setup.sh` 실행 시 아래 명령어가 `~/.zshrc`에 자동 등록됩니다.

| 명령어              | 설명                                                          |
| ------------------- | ------------------------------------------------------------- |
| `project-init`      | 새 프로젝트에 dotfiles base config 설치                       |
| `jira-open`         | 현재 브랜치명에서 Jira 티켓 번호 추출 → 브라우저에서 열기    |
| `amplify-status`    | AWS Amplify 최신 배포 상태 터미널에서 확인                    |
| `jenkins-status`    | Jenkins 최신 빌드 상태 터미널에서 확인                        |

### 환경변수 설정 (필요 시 `~/.zshrc`에 추가)

```bash
# Jira
export JIRA_BASE_URL="https://your-company.atlassian.net"

# AWS Amplify
export AMPLIFY_APP_ID="your-app-id"
export AMPLIFY_BRANCH="main"

# Jenkins
export JENKINS_URL="https://jenkins.your-company.com"
export JENKINS_JOB="your-job-name"
export JENKINS_USER="your-username"
export JENKINS_TOKEN="your-api-token"
```

### Claude 스킬 (글로벌)

`~/.claude/skills/`에 자동 연결. 모든 프로젝트에서 사용 가능.

| 스킬   | 명령어    | 설명                                                           |
| ------ | --------- | -------------------------------------------------------------- |
| docs   | `/docs`   | JSDoc / Storybook / README 자동화                              |
| review | `/review` | 시니어 관점 코드 리뷰 (보안/성능/아키텍처)                    |
| perf   | `/perf`   | 성능 분석 + Lighthouse 자동화                                  |
| jira   | `/jira`   | 이슈 생성·수정·상태전환·업무로그·주간요약. 멀티 프로젝트 지원 |
| api    | `/api`    | Swagger → TypeScript 타입 + React Query 훅 자동 생성           |
| ds     | `/ds`     | 디자인 시스템 컴플라이언스 검증                                |
| seo    | `/seo`    | Next.js 메타태그 / JSON-LD 자동 생성                           |

> 프로젝트 전용 스킬은 각 프로젝트 `.claude/skills/`에 별도 관리.

### MCP 연동

Claude Code 스킬에서 사용하는 외부 서비스 연동 방식.

| 서비스     | 연결 방식             | 범위   | 비고                                    |
| ---------- | --------------------- | ------ | --------------------------------------- |
| Atlassian  | claude.ai OAuth 통합  | 글로벌 | `/jira` 스킬에서 사용. 계정에 귀속됨   |
| Notion     | claude.ai OAuth 통합  | 글로벌 | 계정에 귀속됨                           |
| Gmail      | claude.ai OAuth 통합  | 글로벌 | 계정에 귀속됨                           |

**연결 방법**: claude.ai 웹 > Settings > Integrations에서 각 서비스 OAuth 연결

> `~/.claude/settings.json`의 `mcpServers`가 아닌 **claude.ai 계정 기반 통합**이므로
> 새 PC에서 `setup.sh` 실행 후 claude.ai 로그인만 하면 자동으로 사용 가능.
> 인증 만료 시 claude.ai Settings > Integrations에서 재연결.

---

## 향후 개선 예정

- [ ] **Storybook → Figma 연동**: `@storybook/addon-designs`로 Story에 Figma 링크 임베드. 디자이너와 Figma → Story 1:1 확인 프로세스로 QA 커뮤니케이션 감소.
