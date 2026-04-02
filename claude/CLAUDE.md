# CLAUDE.md

> 이 파일은 Claude가 코드 작성 시 자동으로 참조하는 글로벌 컨벤션입니다. 레포: `stronger-dotfiles` |
> 마지막 수정: 2026-04-01

---

## 🛠️ 기술 스택

- **언어**: TypeScript (strict mode)
- **프레임워크**: React, Next.js
- **스타일링**: Vanilla Extract, Class Variance Authority (CVA), `cn()` 유틸리티
- **문서화**: Storybook
- **린트/포맷**: ESLint (flat config) + Prettier
- **패키지 매니저**: npm

---

## ⚛️ React 컨벤션

### 컴포넌트 정의

반드시 **화살표 함수 + Named Export** 조합을 사용한다.

```typescript
// ✅
export const Button = ({ label }: ButtonProps) => {
  return <button>{label}</button>;
};

// ❌ function 선언식 금지
export default function Button() {}
```

### Props 타입

- `type` 키워드 사용 (`interface` 금지)
- 모든 Props는 명시적 타입 정의 필수
- `any` 사용 금지 → `unknown` 또는 명확한 타입 사용

```typescript
// ✅
type ButtonProps = {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
};

// ❌
interface ButtonProps { ... }
const Button = ({ children }: any) => { ... }
```

### 리스트 렌더링

`key` prop 필수, index 사용 지양

```typescript
// ✅
items.map((item) => <Item key={item.id} {...item} />)

// ❌
items.map((item, i) => <Item key={i} {...item} />)
```

---

## 📘 TypeScript 컨벤션

- `strict: true` 항상 유지
- `noUnusedLocals`, `noUnusedParameters` 활성화 → 미사용 변수 금지
- `type` 우선, `interface` 지양
- `any` 경고 → 반드시 구체적 타입으로 교체
- 접두사 `_`로 시작하는 변수는 unused 예외 허용 (`_props` 등)

---

## 📦 Import 정렬 순서

저장 시 `eslint-plugin-simple-import-sort`가 자동 정렬한다. 수동 작성 시에도 아래 순서를 준수한다.

```typescript
// 1. React
import { useState } from 'react';

// 2. 외부 라이브러리
import { clsx } from 'clsx';

// 3. 내부 모듈 (@ alias)
import { cn } from '@/shared/lib/utils';

// 4. 상대 경로
import { helper } from './utils';

// 5. 타입 import
import type { ButtonProps } from './types';

// 6. 스타일/에셋
import './styles.css';
```

---

## 🎨 스타일링 컨벤션

### Vanilla Extract — 기본 스타일

```typescript
// Button.css.ts
import { recipe } from '@vanilla-extract/recipes';

export const button = recipe({
  base: { borderRadius: '4px', padding: '8px 16px' },
  variants: {
    variant: {
      primary: { backgroundColor: 'blue', color: 'white' },
    },
  },
  defaultVariants: { variant: 'primary' },
});
```

### CVA — 복잡한 variant 관리

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('base-class', {
  variants: {
    variant: { primary: 'bg-blue-500', secondary: 'bg-gray-200' },
    size: { sm: 'px-2 py-1', md: 'px-4 py-2' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});

type ButtonProps = VariantProps<typeof buttonVariants> & {
  children: React.ReactNode;
};
```

### cn() — 조건부 클래스

```typescript
import { cn } from '@/shared/lib/utils';

<button className={cn('base', isActive && 'bg-blue-500', disabled && 'opacity-50')} />
```

---

## 📂 파일명 & 폴더 구조

### 네이밍 규칙

| 파일 종류      | 규칙                      | 예시                         |
| -------------- | ------------------------- | ---------------------------- |
| React 컴포넌트 | PascalCase                | `Button.tsx`                 |
| 스타일 파일    | PascalCase.css.ts         | `Button.css.ts`              |
| Storybook      | PascalCase.stories.tsx    | `Button.stories.tsx`         |
| 타입 정의      | camelCase 또는 PascalCase | `types.ts`, `buttonTypes.ts` |
| 유틸리티       | camelCase                 | `formatDate.ts`              |

### 컴포넌트 폴더 구조

```
src/components/Button/
  Button.tsx           # 컴포넌트
  Button.css.ts        # 스타일
  Button.stories.tsx   # Storybook
  index.ts             # Re-export
```

### index.ts 패턴

```typescript
// src/components/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

---

## 📝 커밋 메시지 컨벤션

### 형식

```
{이모지} {타입}: {제목}

{본문 - 무엇을, 왜}

{Footer - Jira 티켓}
```

### 타입 목록

| 이모지 | 타입     | 용도             |
| ------ | -------- | ---------------- |
| ✨     | Feat     | 새로운 기능      |
| ⚡     | Perf     | 성능 개선        |
| 🐛     | Fix      | 버그 수정        |
| 🎨     | UI/UX    | UI 변경          |
| 💄     | Style    | 코드 스타일      |
| ➕     | Add      | 의존성 추가      |
| ♻️     | Refactor | 리팩토링         |
| 🔧     | Chore    | 기타             |
| 🏗️     | Build    | 빌드 관련 수정   |
| 👷     | CI       | CI 설정 수정     |
| 📝     | Docs     | 문서             |
| 🔥     | Remove   | 코드/파일 삭제   |
| 🔍     | SEO      | 검색 엔진 최적화 |
| 🚧     | WIP      | 작업 진행 중     |
| ♿     | A11y     | 접근성 개선      |
| 🧪     | Test     | 테스트           |
| 🚚     | Move     | 파일/폴더 이동   |
| ✏      | Edit     | 간단한 수정      |
| 🚨     | Linter   | 린트 에러 수정   |
| 🔀     | Merge    | 브랜치 병합      |

### 예시

```
✨ Feat: 로그인 폼 유효성 검사 추가

- 이메일 형식 검증 로직 구현
- 비밀번호 최소 길이 8자 제한

PROJ-123
```

---

## 🤖 Claude 행동 지침

코드 생성 시 아래 규칙을 반드시 따른다.

1. **항상 TypeScript** — JS 파일 생성 금지, 타입 명시 필수
2. **Named Export만 사용** — `export default` 금지 (단, `.stories.tsx`는 예외)
3. **화살표 함수 컴포넌트** — `function` 선언식 사용 금지
4. **`any` 금지** — 타입 불명확 시 `unknown` + 타입 가드 사용
5. **Props 타입 필수** — 모든 컴포넌트에 `type XxxProps = {...}` 정의
6. **import 순서 준수** — 위의 Import 정렬 순서 따르기
7. **`console.log` 금지** — `console.warn`, `console.error`만 허용
8. **Storybook 파일 생성 시** — `tags: ['autodocs']` 포함, 각 variant별 개별 Story 작성
9. **스타일 작성 시** — Vanilla Extract 또는 CVA 사용, 인라인 스타일 지양
10. **컴포넌트 구조** — 폴더 단위로 생성 + `index.ts` re-export 포함

---

## ✅ Prettier 핵심 설정

```
singleQuote: true
semi: true
tabWidth: 2
printWidth: 80
trailingComma: 'es5'
arrowParens: 'always'
endOfLine: 'lf'
```
