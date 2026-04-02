---
name: jira
description: >
  Atlassian MCP 기반 Jira 자동화. 이슈 생성/수정/상태전환/업무로그/오늘할일.
  프로젝트별 설정을 상단 섹션에서 관리하며 멀티 프로젝트 전환 지원.
disable-model-invocation: false
user-invocable: true
---

# Jira 자동화 스킬

Atlassian MCP를 통해 Jira 이슈를 생성·수정·조회하고 업무 로그를 기록합니다.

---

## 📌 프로젝트 설정

> 다른 프로젝트에서 사용 시 이 섹션만 수정하세요.
> 여러 프로젝트를 전환할 때는 `/jira switch [프로젝트키]`를 사용하세요.

### 활성 프로젝트: NSHOP (노베라샵)

| 항목             | 값                                   |
| ---------------- | ------------------------------------ |
| 프로젝트 키      | `NSHOP`                              |
| Cloud ID         | `0f8ea3a6-ea30-4713-9b97-a250150ba119` |
| 기본 접두사      | `[FE-C]`                             |
| 기본 레이블      | `domain-noveraShop`, `layer-frontend` |
| Start date 필드  | `customfield_10312`                  |
| Sprint 필드      | `customfield_10105`                  |

---

## 🚀 명령어 목록

```bash
/jira create [parent=#번호]   # 현재 대화/코드 분석 → 이슈 생성
/jira update #152~156         # 이슈 일괄 수정 (담당자/날짜/레이블)
/jira ing #152~156            # 상태 → 진행 중
/jira done #152~156           # 상태 → 완료
/jira today                   # 오늘 내 이슈 목록
/jira log #152 2h "작업 내용" # 업무 로그 기록
/jira week                    # 이번 주 완료/진행 이슈 요약
/jira switch PROJ             # 활성 프로젝트 전환
```

---

## 🚨 모든 create/update 필수 필드

아래 4개 필드는 **항상** 포함해야 합니다. 누락 시 백로그에 묻히거나 스프린트 계획 불가.

```javascript
{
  assignee: { accountId: "현재 사용자 ID" },  // atlassianUserInfo로 조회
  labels: ["domain-noveraShop", "layer-frontend", ...추가레이블],
  customfield_10312: "2026-03-04",             // Start date = 오늘
  duedate: "2026-03-04"                        // 기한 = 오늘
}
```

---

## 1. 이슈 생성 (create)

대화 내용과 Git 변경사항을 분석하여 이슈를 생성합니다.

```bash
/jira create              # 단독 이슈
/jira create parent=#15   # 에픽/스토리 하위로 생성
```

**자동 처리 순서:**

1. `atlassianUserInfo` → 현재 사용자 ID 조회
2. 오늘 날짜 계산 → Start date / duedate 설정
3. 최근 이슈에서 스프린트 자동 복사 (아래 로직 참고)
4. 대화/코드 분석 → 제목 생성, 레이블 자동 추천
5. 이슈 생성

**스프린트 자동 복사 로직:**

```javascript
// 1. 활성 스프린트의 최근 이슈에서 sprint 복사
const recentIssue = await searchJql(
  `project = NSHOP AND sprint in openSprints() ORDER BY created DESC`,
  { fields: ["customfield_10105"], maxResults: 1 }
);

// 2. 있으면 복사, 없으면 현재 활성 스프린트 직접 조회
if (!recentIssue.length) {
  // searchJql: project = NSHOP AND sprint in openSprints()
  // → 첫 번째 sprint 값 사용
}
```

> ✅ `openSprints()` JQL 사용으로 하드코딩 없이 현재 활성 스프린트 자동 감지

---

## 2. 이슈 일괄 수정 (update)

```bash
/jira update #152~156
```

담당자, Start date, 기한, 레이블을 오늘 기준으로 일괄 업데이트합니다.

---

## 3. 상태 전환 (ing / done)

```bash
/jira ing #152~156    # "진행 중"으로 전환
/jira done #152~156   # "완료"로 전환
```

`getTransitionsForJiraIssue` → 전환 가능 목록 조회 후 일치하는 상태로 전환합니다.

---

## 4. 오늘 할 일 (today)

```bash
/jira today
```

아래 두 조건을 합쳐서 보여줍니다:

```jql
-- 이번 스프린트 내 내 이슈
project = NSHOP AND sprint in openSprints() AND assignee = currentUser() ORDER BY status ASC

-- 기한 미설정 + 내 이슈 (백로그 유실 방지)
project = NSHOP AND assignee = currentUser() AND duedate is EMPTY AND status != Done
```

출력 형식: `[상태] #번호 제목`

---

## 5. 업무 로그 기록 (log)

```bash
/jira log #152 2h "브랜드 목록 API 연동 완료"
/jira log #152 30m "코드 리뷰 반영"
```

- 시간 형식: `1h`, `30m`, `1h30m`
- 내용이 없으면 현재 대화 내용 기반으로 자동 생성
- `started`: 현재 시각 자동 설정

Confluence 업무일지와 연동 시: 같은 내용을 Confluence 페이지에도 기록 원하면 `/jira log` 뒤에 `--confluence` 추가.

---

## 6. 주간 요약 (week)

```bash
/jira week
```

이번 주 내 이슈 현황을 요약합니다.

```jql
project = NSHOP AND assignee = currentUser()
AND sprint in openSprints()
ORDER BY status ASC
```

출력 형식:
```
✅ 완료 (3)
  #151 로그인 폼 유효성 검사
  #152 브랜드 목록 API 연동
  ...

🔄 진행 중 (2)
  #155 상품 상세 페이지 리팩토링
  ...

📋 예정 (1)
  #156 장바구니 UX 개선
```

---

## 7. 프로젝트 전환 (switch)

```bash
/jira switch PROJ
```

다른 프로젝트로 전환합니다. 이 스킬 상단 "활성 프로젝트" 섹션의 값을 기준으로 동작하므로,
**새 프로젝트 추가 시 상단 표에 항목을 추가**하고 `switch`로 활성화합니다.

---

## 레이블 규칙

제목 분석으로 자동 추천합니다.

| 레이블 접두사 | 예시                                          |
| ------------- | --------------------------------------------- |
| `type-`       | `type-feature`, `type-bugfix`, `type-refactor`, `type-docs` |
| `scope-`      | `scope-new`, `scope-improve`, `scope-hotfix`  |
| `layer-`      | `layer-frontend`, `layer-backend`             |
| `domain-`     | `domain-noveraShop` (프로젝트 기본값)         |

---

## MCP 도구 참조

| 도구                                        | 용도              |
| ------------------------------------------- | ----------------- |
| `atlassianUserInfo`                         | 현재 사용자 ID    |
| `searchJiraIssuesUsingJql`                  | JQL 검색          |
| `createJiraIssue`                           | 이슈 생성         |
| `editJiraIssue`                             | 이슈 수정         |
| `getTransitionsForJiraIssue`                | 전환 가능 상태    |
| `transitionJiraIssue`                       | 상태 전환         |
| `getJiraIssue`                              | 이슈 단건 조회    |
| `getAccessibleAtlassianResources`           | Cloud ID 확인     |
