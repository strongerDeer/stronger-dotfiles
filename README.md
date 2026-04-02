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
| `~/.claude/CLAUDE.md` | Claude Code 글로벌 컨벤션 (심볼릭 링크)          |
| `~/.gitignore_global` | 전역 gitignore (심볼릭 링크)                     |
| `~/.gitmessage`       | 커밋 메시지 템플릿 (심볼릭 링크)                 |
| `~/.zshrc`            | `DOTFILES` 환경변수 + `project-init` 명령어 등록 |

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
