---
name: ds
description:
  디자인 시스템 검증, 적용률 측정, 자동 문서 업데이트, CI/CD 테스트 지원, WCAG 2.1 접근성 검증.
  @bemily/design-system과 Tailwind CSS 규격 준수 + 시맨틱 HTML, ARIA, 키보드 접근성 확인
disable-model-invocation: false
user-invocable: true
---

# 디자인 시스템 가이드 & 검증 시스템

프로젝트의 디자인 시스템 규격을 자동으로 적용하고, 일관성을 검증하며, 적용률을 측정합니다.

## 🎯 주요 기능

- **UI 검증**: 컴포넌트, 컬러, 간격, 타이포그래피 규격 준수 확인
- **접근성 검증**: WCAG 2.1 AA 기준, 시맨틱 HTML, ARIA, 키보드 접근성
- **적용률 측정**: 프로젝트 전체 디자인 시스템 적용률 리포트
- **자동 문서 업데이트**: 디자인 시스템 패키지 변경 시 SKILL.md 자동 업데이트
- **자동화 테스트**: CI/CD 통합 가능한 테스트 (임계값 설정)
- **변경 감지**: 디자인 시스템 업데이트 자동 추적

## 🚀 사용 방법

```bash
# 기본 검증 (단일 파일)
/ds app/components/Button.tsx

# 접근성 검증 추가
/ds app/components/Button.tsx --a11y

# 프로젝트 전체 적용률 리포트
/ds --report

# 접근성 포함 리포트
/ds --report --a11y

# 자동화 테스트 (CI/CD)
/ds --test --threshold 80

# 문서 자동 업데이트
/ds --update-docs

# 문서 변경 사항 확인
/ds --diff-docs
```

## 🎨 디자인 시스템 구성

### 1. Design System: @bemily/design-system (v0.1.5)

**Core 컴포넌트**:

- **Form**: `Button`, `Input`, `Textarea`, `Checkbox`, `Radio`, `Select`, `Stepper`
- **Layout**: `Flex`, `Grid`
- **Data Display**: `Text`, `Badge`, `Avatar`, `Table`, `Thumbnail`, `Carousel`
- **Navigation**: `Tabs`, `BreadCrumb`, `Pagination`
- **Feedback**: `Modal`, `Alert`, `Dialog`, `Accordion`
- **Icons**: 100+ 아이콘 (Heart, Search, User, ChevronDown 등)

### 2. 프로젝트 테마 (`app/theme.config.ts`)

#### 컬러 팔레트

```typescript
// 브랜드 컬러 (theme.brand1)
brand.default; // 기본 브랜드 컬러
brand.hover; // 호버 상태
brand.active; // 액티브 상태
brand.subtle; // 연한 톤
brand.strong; // 강한 톤
brand.stronger; // 더 강한 톤
brand.strongest; // 가장 강한 톤
brand.soft; // 부드러운 톤
brand.borderSoft; // 연한 테두리 (#cedbff)

// 폰트
fontFamily: ('Pretendard', sans - serif);

// Radius (모든 컴포넌트 동일)
radius: rounded.xs;
```

#### 애니메이션 (Spring Effect)

```typescript
// Strong Spring Effect (High overshoot)
hover: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
click: 'scale(0.85)'
entrance: 'opacity 0.8s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'

transition: {
  fast: '0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  normal: '0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
  slow: '0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
}
```

### 3. Tailwind CSS 규격

#### 간격 (Spacing)

```css
/* Tailwind Spacing Scale */
gap-4   /* 1rem (16px) */
gap-6   /* 1.5rem (24px) */
gap-8   /* 2rem (32px) */
gap-12  /* 3rem (48px) */

p-4     /* padding: 1rem */
p-6     /* padding: 1.5rem */
m-4     /* margin: 1rem */

/* 자주 사용하는 조합 */
px-4 py-2   /* 버튼 기본 */
p-6         /* 카드 기본 */
gap-4       /* Flex 아이템 간격 (작음) */
gap-8       /* Flex 아이템 간격 (보통) */
gap-12      /* Flex 아이템 간격 (큼) */
```

#### 타이포그래피

```css
/* 폰트 크기 */
text-10  /* 10px - 작은 라벨 */
text-12  /* 12px - 기본 라벨, 설명 */
text-15  /* 15px - 본문 */
text-22  /* 22px - 제목 */

/* 폰트 두께 */
font-[400]  /* Regular */
font-[500]  /* Medium */
font-bold   /* Bold */

/* 컬러 (자주 사용) */
text-[#000000]   /* 검정 - 기본 텍스트 */
text-[#7E93A8]   /* 회색 - 보조 텍스트 */
text-[#B2BBC8]   /* 연한 회색 - 비활성 텍스트 */
text-[#E93A86]   /* 핑크 - 할인율, 강조 */
```

#### 반응형 (Mobile-First)

```css
/* 기본 (모바일) */
text-12

/* 데스크탑 (md: 768px 이상) */
md:text-15

/* 예시 */
className="text-12 md:text-15"  /* 모바일 12px, 데스크탑 15px */
className="hidden md:flex"      /* 모바일 숨김, 데스크탑 표시 */
className="flex md:hidden"      /* 모바일 표시, 데스크탑 숨김 */
```

## 📋 UI 검증 항목

### 1. 컴포넌트 선택

```typescript
// ✅ 올바른 예: Design System 사용
import { Button, Input, Badge, Text } from '@bemily/design-system';

export const LoginForm = () => {
  return (
    <>
      <Input
        label="이메일"
        type="email"
        placeholder="이메일을 입력하세요"
        size="md"
      />
      <Button variant="solid" color="primary" size="md">
        로그인
      </Button>
      <Badge variant="soft" label="신상품" color="primary" />
    </>
  );
};

// ❌ 잘못된 예: 직접 구현
export const LoginForm = () => {
  return (
    <>
      <input className="..." />  {/* 직접 구현 금지 */}
      <button className="...">로그인</button>
      <span className="badge">신상품</span>  {/* Badge 사용 필수 */}
    </>
  );
};
```

### 2. 컬러 사용

```typescript
// ✅ 올바른 예: 정의된 컬러 사용
className = 'text-[#000000]'; // 기본 텍스트
className = 'text-[#7E93A8]'; // 보조 텍스트
className = 'text-[#E93A86]'; // 강조 (할인율)
className = 'bg-blue-500'; // Design System 컬러

// ❌ 잘못된 예: 임의의 컬러
className = 'text-[#123456]'; // 정의되지 않은 컬러
className = 'bg-red-500'; // 브랜드 컬러 아님
```

### 3. 간격 규격

```typescript
// ✅ 올바른 예: 4의 배수 사용
className = 'gap-4'; // 16px
className = 'gap-8'; // 32px
className = 'gap-12'; // 48px
className = 'p-6'; // 24px

// ❌ 잘못된 예: 불규칙한 간격
className = 'gap-3'; // 12px - 규격 외
className = 'gap-7'; // 28px - 규격 외
className = 'p-5'; // 20px - 규격 외
```

### 4. 타이포그래피

```typescript
// ✅ 올바른 예: 정의된 크기 사용
className = 'text-12 md:text-15'; // 본문
className = 'text-10 md:text-12'; // 라벨
className = 'text-12 font-[400]'; // Regular

// ❌ 잘못된 예: 임의의 크기
className = 'text-13'; // 정의되지 않은 크기
className = 'text-base'; // Tailwind 기본값 대신 명시적 크기 사용
```

### 5. 반응형 디자인

```typescript
// ✅ 올바른 예: Mobile-First
<div className="flex flex-col gap-6 md:gap-12">
  <span className="text-12 md:text-15">텍스트</span>
</div>

// 데스크탑 전용 버튼
<Button className="hidden md:flex">데스크탑</Button>

// 모바일 전용 버튼
<Button className="flex md:hidden">모바일</Button>

// ❌ 잘못된 예: Desktop-First
<div className="md:flex-col flex">  // 잘못된 순서
```

### 6. 애니메이션 (Spring Effect)

```typescript
// ✅ 올바른 예: Spring transition 사용
className = 'transition hover:scale-110 active:scale-95';

// Hover 애니메이션
className = 'transition hover:scale-105';

// Click 애니메이션
className = 'active:scale-[98%]';

// ❌ 잘못된 예: 부자연스러운 애니메이션
className = 'hover:scale-150'; // 너무 큰 scale
className = 'transition-all'; // 불필요한 모든 속성 transition
```

## 🎯 실전 예시

### 예시 1: 버튼 컴포넌트

```typescript
// ✅ 올바른 예
import { Button } from '@bemily/design-system';

export const ProductCard = () => {
  return (
    <>
      {/* Solid 버튼 (기본) */}
      <Button
        variant="solid"      // solid | outline | ghost
        color="primary"      // primary | secondary | tertiary | blue | green | yellow | red
        size="md"            // xs | sm | md | lg | xl
        leftIcon="Heart"     // 왼쪽 아이콘
      >
        찜하기
      </Button>

      {/* Ghost 버튼 (텍스트 + 호버) */}
      <Button
        variant="ghost"
        color="secondary"
        size="sm"
        icon="Heart"         // 아이콘만 표시
        className="transition hover:scale-110 active:scale-95"
      />

      {/* Loading 상태 */}
      <Button
        variant="outline"
        color="primary"
        loading={true}       // 로딩 스피너 표시
        disabled={isLoading}
      >
        제출 중...
      </Button>
    </>
  );
};

// ❌ 잘못된 예
export const ProductCard = () => {
  return (
    <button className="rounded-full bg-gray-300 px-3 py-1">
      찜하기  {/* Design System Button 사용 필수 */}
    </button>
  );
};
```

### 예시 2: 카드 레이아웃

```typescript
// ✅ 올바른 예
export const ProductCard = () => {
  return (
    <div className="flex flex-col gap-6 rounded-lg p-6 md:gap-12">
      {/* 이미지 */}
      <Thumbnail src={image} alt="상품" />

      {/* 정보 */}
      <div className="flex flex-col gap-4 md:gap-8">
        <span className="text-12 font-[400] md:text-15">
          상품명
        </span>
        <span className="text-12 font-[400] md:text-22">
          <strong>{price}</strong>원
        </span>
      </div>
    </div>
  );
};
```

### 예시 3: 반응형 버튼 그룹

```typescript
// ✅ 올바른 예: 데스크탑/모바일 분리
export const ProductCard = () => {
  return (
    <>
      {/* 데스크탑 버튼 */}
      <Button
        className="hidden md:flex transition hover:scale-110"
        icon="Heart"
      >
        찜하기
      </Button>

      {/* 모바일 버튼 */}
      <Button
        className="flex md:hidden"
        icon="Heart"
      >
        찜하기
      </Button>
    </>
  );
};
```

### 예시 4: 배지 (Badge)

```typescript
// ✅ 올바른 예
import { Badge } from '@bemily/design-system';

export const ProductInfo = () => {
  return (
    <>
      {/* Soft variant (연한 배경) */}
      <Badge
        variant="soft"           // solid | outline | soft
        label="베스트"
        color="primary"          // primary | green | red | yellow | blue
        leftIcon="Heart"
      />

      {/* Outline variant */}
      <Badge
        variant="outline"
        label="무료배송"
        color="green"
        rounded="full"           // none | xs | md | full
      />

      {/* Solid variant (기본) */}
      <Badge
        variant="solid"
        label="리워드"
        color="primary"
        rightIcon="ChevronRight"
      />

      {/* 상태 표시 배지 */}
      <Badge
        variant="soft"
        label="품절"
        color="muted"            // solid variant: muted | neutral-emphasis | neutral-disabled
      />
    </>
  );
};

// ❌ 잘못된 예
export const ProductInfo = () => {
  return (
    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs">
      베스트  {/* Badge 컴포넌트 사용 필수 */}
    </span>
  );
};
```

## 🔍 검증 프로세스

### 1단계: 파일 읽기

```
$ARGUMENTS 파일을 읽고 UI 코드를 확인합니다.
```

### 2단계: 검증 항목 체크

- [ ] Design System 컴포넌트 사용
- [ ] 정의된 컬러 팔레트 사용
- [ ] 간격 규격 준수 (4의 배수)
- [ ] 타이포그래피 규격 준수
- [ ] 반응형 디자인 (Mobile-First)
- [ ] 일관된 애니메이션 (Spring Effect)

### 3단계: 리포트 생성

## 📊 검증 리포트 형식

```markdown
# 디자인 시스템 검증: [파일명]

## ✅ 통과

- Design System 컴포넌트 사용
- 반응형 디자인 적용

## ⚠️ 경고

### 1. 임의의 컬러 사용 (Line XX)

현재: `text-[#123456]` 권장: `text-[#000000]` 또는 `text-[#7E93A8]`

### 2. 불규칙한 간격 (Line XX)

현재: `gap-5` 권장: `gap-4` 또는 `gap-8`

## ❌ 오류

### 1. Design System 미사용 (Line XX)

현재: `<button>...</button>` 수정: `<Button>...</Button>` (from @bemily/design-system)

## 💡 개선 제안

[구체적인 수정 방법]
```

## 🚀 사용 예시

```bash
# UI 컴포넌트 검증
/ds app/components/product/card/card.tsx

# 페이지 전체 검증
/ds app/(main)/products/page.tsx

# 여러 파일 검증
/ds app/components/**/*.tsx
```

## 📚 디자인 시스템 체크리스트

### Form 컴포넌트

- [ ] `Button` - variant (solid/outline/ghost), size (xs-xl), color (primary/secondary...)
- [ ] `Input` - label 필수, type, variant (outline/underline/none), leftIcon/rightIcon
- [ ] `Textarea` - label 필수, rows, autoGrow, showCharacterCount
- [ ] `Checkbox` - size (md/lg), label, helpText, onChange
- [ ] `Radio` - RadioGroup과 함께 사용 권장
- [ ] `Select` - options 배열, leadingIcon, showCaret
- [ ] `Stepper` - value, min, max, step, variant (outlined/filled)

### Layout 컴포넌트

- [ ] `Flex` - direction, justify, align, gap (0/4/8/12/16/24/32/48/64)
- [ ] `Grid` - columns, rows, gap, autoFlow, placeContent

### Data Display 컴포넌트

- [ ] `Badge` - variant (solid/outline/soft), color, leftIcon/rightIcon
- [ ] `Text` - preset (title1-5, body1-4, label1-3), size, weight
- [ ] `Thumbnail` - src, alt, ratio (1/16:9/1.618:1), rounded
- [ ] `Avatar` - type (image/text/empty), size, rounded
- [ ] `Table` - columns, data, caption
- [ ] `Carousel` - items, slidesPerView, autoplay

### Navigation 컴포넌트

- [ ] `Tabs` - variant (none/underlined/rounded), items, value, onChange
- [ ] `BreadCrumb` - items (label, href, leftIcon)
- [ ] `Pagination` - totalPages, currentPage, onPageChange

### Feedback 컴포넌트

- [ ] `Modal` - title, description, primaryAction, secondaryAction
- [ ] `Alert` - Modal wrapper (X 버튼 없음)
- [ ] `Dialog` - Modal wrapper (X 버튼 있음, children 지원)
- [ ] `Accordion` - type (single/multiple), items

### 컬러 (Tailwind + Design System)

- [ ] 텍스트: `#000000`, `#7E93A8`, `#B2BBC8`
- [ ] 강조: `#E93A86` (할인율)
- [ ] 브랜드: Design System color presets 사용 (primary, secondary, tertiary, blue, green, yellow,
      red)

### 간격 (Tailwind)

- [ ] `gap-4` (16px), `gap-6` (24px), `gap-8` (32px), `gap-12` (48px)
- [ ] `p-4`, `p-6`, `px-4 py-2` (4의 배수 규칙)

### 타이포그래피 (Tailwind)

- [ ] `text-10` (10px), `text-12` (12px), `text-15` (15px), `text-22` (22px)
- [ ] `font-[400]` (Regular), `font-[500]` (Medium), `font-bold`

### 반응형 (Mobile-First)

- [ ] `md:` breakpoint (768px 이상)
- [ ] `text-12 md:text-15` (모바일 12px, 데스크탑 15px)
- [ ] `hidden md:flex` (데스크탑 전용), `flex md:hidden` (모바일 전용)

### 애니메이션 (Spring Effect)

- [ ] `transition` 클래스
- [ ] `hover:scale-105` 또는 `hover:scale-110`
- [ ] `active:scale-95` 또는 `active:scale-[98%]`
- [ ] Spring cubic-bezier: `cubic-bezier(0.34, 1.56, 0.64, 1)`

## 🎨 프로젝트 스타일 가이드 요약

| 항목           | 규격           | 예시                                |
| -------------- | -------------- | ----------------------------------- |
| **폰트**       | Pretendard     | `font-family: 'Pretendard'`         |
| **Radius**     | rounded.xs     | 모든 컴포넌트 동일                  |
| **간격**       | 4의 배수       | 4, 8, 12, 16, 24...                 |
| **텍스트**     | 10, 12, 15, 22 | `text-12 md:text-15`                |
| **컬러**       | 정의된 팔레트  | `#000000`, `#7E93A8`, `#E93A86`     |
| **애니메이션** | Spring Effect  | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| **반응형**     | Mobile-First   | `text-12 md:text-15`                |

## 📌 주의사항

1. **임의의 값 금지**: 규격에 없는 간격, 컬러, 크기 사용 금지
2. **Design System 우선**: 버튼, 인풋 등은 반드시 Design System 사용
3. **반응형 필수**: 모든 UI는 모바일/데스크탑 고려
4. **일관된 애니메이션**: Spring Effect 통일

## 📖 컴포넌트 Props 레퍼런스

### Button

```typescript
<Button
  variant="solid | outline | ghost"
  size="xs | sm | md | lg | xl"
  color="primary | secondary | tertiary | blue | green | yellow | red"
  rounded="none | xs | sm | md | lg | xl | full"
  full={boolean}              // 전체 너비
  disabled={boolean}
  loading={boolean}           // 로딩 스피너
  icon="IconName"             // 아이콘만 표시
  leftIcon="IconName"
  rightIcon="IconName"
  as="button | a | Link"      // 다형성
>
  버튼 텍스트
</Button>
```

### Input

```typescript
<Input
  label="라벨 (필수)"
  type="text | password | email | tel | number | search"
  variant="outline | underline | none"
  size="xs | sm | md | lg | xl"
  color="primary | secondary..."
  rounded="none | xs | sm | md | lg | xl"
  full={boolean}
  leftIcon="IconName | ReactNode"
  rightIcon="IconName | ReactNode"
  onLeftIconClick={() => void}
  onRightIconClick={() => void}
  status="help | success | warn | error"
  statusMessage="상태 메시지"
  showStatusIcon={boolean}
  disabled={boolean}
  error={boolean}
  placeholder="플레이스홀더"
  value={string | number}
  onChange={(e) => void}
/>
```

### Badge

```typescript
<Badge
  variant="solid | outline | soft"
  label="배지 텍스트"
  color="primary | green | red | yellow | blue | muted | neutral-emphasis"
  rounded="none | xs | md | full"
  leftIcon="IconName"
  rightIcon="IconName"
/>
```

### Tabs

```typescript
<Tabs
  items={[
    { label: '탭1', value: 'tab1', disabled: false },
    { label: '탭2', value: 'tab2' }
  ]}
  variant="none | underlined | rounded"
  size="sm | md | lg"
  color="primary"
  rounded="none | xs | sm | md | lg | xl | full"
  justify="start | center | end | between | around | evenly"
  value="현재 활성 탭"
  defaultValue="기본값"
  onChange={(value) => void}
/>
```

### Text

```typescript
<Text
  preset="display1 | title1-5 | body1-4 | label1-3 | caption1-2"
  size={10 | 11 | 12 | 13 | 14 | 15 | 16 | 18 | 20 | 22 | 26 | 32 | 40 | 44 | 56}
  weight="regular | semibold | bold"
  lineHeight="tight | normal | relaxed"
  color="string (hex or theme color)"
  align="left | center | right | justify"
  truncate={boolean | number}  // true 또는 줄 수
  as="p | span | div | h1..."
>
  텍스트 내용
</Text>
```

### Thumbnail

```typescript
<Thumbnail
  src="이미지 URL"
  alt="대체 텍스트"
  width={number}              // em 단위 계산값 (기본: 80)
  color="brand | gray"
  ratio="1 | 16:9 | 1.618:1"
  rounded="none | xs | sm | md | lg | xl | full"
/>
```

### Checkbox

```typescript
<Checkbox
  label="체크박스 레이블"
  size="md | lg"
  checked={boolean}
  defaultChecked={boolean}
  disabled={boolean}
  required={boolean}
  labelPlacement="start | end"
  helpText="부가 설명"
  onChange={(checked) => void}
  id="checkbox-id"
  name="checkbox-name"
  value="checkbox-value"
/>

{/* CheckboxGroup 사용 (권장) */}
<CheckboxGroup
  label="그룹 레이블"
  name="group-name"
  value={['option1', 'option2']}
  onChange={(values) => void}
  direction="vertical | horizontal"
  options={[
    { value: 'option1', label: '옵션 1', helpText: '설명', disabled: false }
  ]}
/>
```

### Flex

```typescript
<Flex
  direction="row | column | row-reverse | column-reverse"
  justify="start | center | end | between | around | evenly"
  align="start | center | end | stretch"
  gap="0 | 4 | 8 | 12 | 16 | 24 | 32 | 48 | 64"  // px
  wrap="wrap | nowrap"
  flex="CSS flex 값"
  width="CSS width"
  height="CSS height"
  as="div | section..."
>
  자식 요소
</Flex>
```

### Modal

```typescript
<Modal
  size="sm | md | lg"
  title="모달 제목"
  description="부가 설명"
  open={boolean}
  onClose={() => void}
  afterClose={() => void}          // 애니메이션 완료 후
  showCloseButton={boolean}
  closeOnBackdropClick={boolean}
  closeOnEscapeKey={boolean}
  primaryAction={{
    label: '확인',
    onClick: () => void,
    loading: boolean,
    variant: 'solid | outline | ghost',
    color: 'primary | ...',
    disabled: boolean
  }}
  secondaryAction={{ ... }}
  buttonsAlign="left | center | right"
  buttonsDirection="row | column"
>
  모달 내용 (Dialog에서만 사용)
</Modal>
```

### 아이콘 사용 가능 목록 (IconName)

```typescript
// 자주 사용하는 아이콘
'Heart' | 'Search' | 'User' | 'Bell' | 'Home' | 'Bag' | 'Mail';
'ChevronDown' | 'ChevronUp' | 'ChevronLeft' | 'ChevronRight';
'CircleCheck' | 'CircleX' | 'CircleError' | 'CircleInfo';
'Plus' | 'Minus' | 'Check' | 'X' | 'Edit' | 'Trash';
'Settings' | 'Filter' | 'Sorting' | 'Calendar' | 'Pin';
'Heart' | 'Gift' | 'Coupon' | 'Ticket' | 'Package';
'KakaoTalk' | 'Naver' | 'Image' | 'Upload' | 'Download';
// ... 100+ 아이콘 사용 가능
```

## 🔗 참고 자료

- 프로젝트 테마: `app/theme.config.ts`
- Design System: `@bemily/design-system` (v0.1.5)
- Design System 패키지: `node_modules/@bemily/design-system/dist/index.d.ts`
- Tailwind Spacing: https://tailwindcss.com/docs/customizing-spacing
- Vanilla Extract (스타일 시스템): https://vanilla-extract.style

## 📊 적용률 리포트 (`--report`)

프로젝트 전체의 디자인 시스템 적용률을 측정하고 리포트를 생성합니다.

### 사용법

```bash
# 프로젝트 전체 리포트
/ds --report

# 특정 폴더만 리포트
/ds app/components --report

# 상세 리포트 (파일별 상세 정보)
/ds --report --verbose
```

### 출력 예시

```markdown
# 디자인 시스템 적용률 리포트

## 📊 전체 요약

- **적용률**: 78% (47/60 파일)
- **총 파일 수**: 60개
- **준수 파일**: 47개 ✅
- **위반 파일**: 13개 ⚠️

## 🎯 카테고리별 적용률

| 카테고리      | 적용률      | 파일 수          | 상태         |
| ------------- | ----------- | ---------------- | ------------ |
| 컴포넌트 사용 | 85% (51/60) | Button, Input 등 | ✅ 양호      |
| 컬러 규격     | 72% (43/60) | 브랜드 컬러 준수 | ⚠️ 개선 필요 |
| 간격 규격     | 80% (48/60) | 4의 배수 규칙    | ✅ 양호      |
| 타이포그래피  | 90% (54/60) | text-10,12,15,22 | ✅ 우수      |
| 반응형        | 75% (45/60) | Mobile-First     | ⚠️ 개선 필요 |
| 애니메이션    | 88% (53/60) | Spring Effect    | ✅ 우수      |

## ⚠️ 위반 사항 (13개 파일)

### 🔴 High Priority (즉시 수정 필요)

1. **app/components/legacy/OldButton.tsx**
   - 문제: `<button>` 직접 구현 (Design System Button 미사용)
   - 위치: Line 24-32
   - 적용률: 0% (0/6 검증 항목)

### 🟡 Medium Priority (1주 내 수정 권장)

2. **app/components/ProductCard.tsx**
   - 문제: gap-5 사용 (규격: gap-4 또는 gap-6)
   - 위치: Line 42
   - 적용률: 80% (4/5 검증 항목)

## 📈 개선 추이

- **이전 측정** (2024-02-20): 65%
- **현재** (2024-02-24): 78%
- **개선**: +13% 🎉

## 💡 개선 제안

1. legacy/ 폴더 우선 리팩토링 (5개 파일, 평균 15%)
2. 컬러 규격 위반 일괄 수정 (8개 파일)
3. 간격 규격 미준수 수정 (12개 파일)

## 🎯 목표 로드맵

- **단기 (1주)**: 85% 달성
- **중기 (1개월)**: 95% 달성
- **장기 (3개월)**: 100% 달성
```

---

## 🧪 자동화 테스트 (`--test`)

CI/CD 파이프라인에서 실행 가능한 자동화 테스트입니다.

### 사용법

```bash
# 기본 테스트 (임계값 80%)
/ds --test

# 임계값 설정
/ds --test --threshold 85

# 특정 폴더만 테스트
/ds app/components --test --threshold 90
```

### 출력 예시

```bash
🧪 디자인 시스템 테스트 실행 중...

테스트 결과:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 컴포넌트 사용: 85% (51/60) - PASS (임계값: 80%)
❌ 컬러 규격: 72% (43/60) - FAIL (임계값: 80%)
✅ 간격 규격: 80% (48/60) - PASS (임계값: 80%)
✅ 타이포그래피: 90% (54/60) - PASS (임계값: 80%)
❌ 반응형: 75% (45/60) - FAIL (임계값: 80%)
✅ 애니메이션: 88% (53/60) - PASS (임계값: 80%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 전체 요약:
- 전체 적용률: 78% (47/60 파일)
- 통과: 4/6 카테고리
- 실패: 2/6 카테고리
- 상태: ❌ FAILED

⚠️  실패 항목:
1. 컬러 규격: 72% < 80% (8개 파일 위반)
2. 반응형: 75% < 80% (15개 파일 위반)

💡 다음 조치:
1. /ds --report (상세 리포트 확인)
2. 위반 파일 수정
3. 테스트 재실행

Exit code: 1
```

### CI/CD 통합 예시

**package.json**:

```json
{
  "scripts": {
    "design:test": "claude /ds --test --threshold 80",
    "design:report": "claude /ds --report",
    "precommit": "npm run design:test"
  }
}
```

**GitHub Actions** (`.github/workflows/design-check.yml`):

```yaml
name: Design System Check

on:
  pull_request:
    paths:
      - 'app/**/*.tsx'
      - 'app/**/*.ts'

jobs:
  design-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install Dependencies
        run: npm ci
      - name: Design System Test
        run: npm run design:test
```

---

## 📝 문서 자동 업데이트 (`--update-docs`)

디자인 시스템 패키지가 업데이트되면 SKILL.md를 자동으로 업데이트합니다.

### 사용법

```bash
# 디자인 시스템 패키지 읽고 SKILL.md 업데이트
/ds --update-docs

# 변경 사항 미리보기 (실제 업데이트 안 함)
/ds --diff-docs
```

### 동작 과정

1. ✅ `node_modules/@bemily/design-system/dist/index.d.ts` 파싱
2. ✅ 컴포넌트 목록 추출
3. ✅ Props 타입 분석
4. ✅ 아이콘 목록 추출
5. ✅ SKILL.md 자동 업데이트
6. ✅ 변경 사항 리포트 생성

### 출력 예시 (`--diff-docs`)

```markdown
# 디자인 시스템 문서 변경 사항

## 🆕 추가된 컴포넌트 (2개)

1. **BottomSheet**
   - Props: size, title, open, onClose
   - 설명: 모바일 하단 시트

2. **Switch**
   - Props: checked, onChange, disabled, size
   - 설명: 토글 스위치

## 🔄 변경된 컴포넌트 (3개)

1. **Button**
   - 추가된 Props: `shape="square | circle"` (아이콘 버튼용)

2. **Input**
   - 추가된 Props: `clearable={boolean}` (X 버튼 표시)

3. **Badge**
   - 추가된 color: `purple`, `orange`

## 📊 변경 요약

- 컴포넌트 추가: 2개
- 컴포넌트 변경: 3개
- Props 추가: 5개
- 아이콘 추가: 15개

## 💡 업데이트 권장 조치

1. `/ds --update-docs` 실행 (자동 반영)
2. 삭제된 컴포넌트 사용 코드 확인
3. 새 Props 활용 가능 여부 검토
```

---

## 🎯 실전 워크플로우

### 시나리오 1: PR 전 체크

```bash
# 1. 변경된 파일 검증
/ds app/components/NewFeature.tsx

# 2. 전체 테스트
/ds --test --threshold 80

# 3. 통과 확인 후 PR 생성
```

### 시나리오 2: 정기 검증 (주간)

```bash
# 매주 월요일 아침
/ds --report

# 적용률 추이 확인
# 목표 대비 진행률 확인
```

### 시나리오 3: 디자인 시스템 업데이트

```bash
# 패키지 업데이트 후
npm update @bemily/design-system

# 변경 사항 확인
/ds --diff-docs

# 문서 자동 업데이트
/ds --update-docs
```

---

## 🎯 명령어 옵션 정리

| 옵션            | 설명                  | 예시                            |
| --------------- | --------------------- | ------------------------------- |
| (기본)          | 단일 파일 검증        | `/ds app/components/Button.tsx` |
| `--report`      | 적용률 리포트 생성    | `/ds --report`                  |
| `--test`        | 자동화 테스트 (CI/CD) | `/ds --test`                    |
| `--threshold N` | 테스트 임계값 설정    | `/ds --test --threshold 85`     |
| `--update-docs` | 문서 자동 업데이트    | `/ds --update-docs`             |
| `--diff-docs`   | 문서 변경 사항 확인   | `/ds --diff-docs`               |
| `--verbose`     | 상세 리포트 출력      | `/ds --report --verbose`        |

---

## 📈 성공 지표

### 적용률 목표

- **60% 이하**: 🔴 불량 (즉시 개선 필요)
- **60-80%**: 🟡 개선 필요 (1-2주 내 목표)
- **80-95%**: ✅ 양호 (유지 및 점진적 개선)
- **95% 이상**: ✅ 우수 (목표 달성)

### 카테고리별 가중치

- 컴포넌트 사용: 30%
- 컬러 규격: 20%
- 간격 규격: 15%
- 타이포그래피: 15%
- 반응형: 10%
- 애니메이션: 10%

---

## ♿ 접근성 검증 (WCAG 2.1 AA)

### 자동 검증 항목

```bash
# 접근성 검증
/ds app/components/ProductCard.tsx --a11y

# 출력 예시
♿ 접근성 검증 결과

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 접근성 점수: 85/100 (AA 기준) ✅

1. 시맨틱 HTML           🟢 95/100
2. ARIA 속성             🟡 80/100
3. 키보드 접근성         🟢 90/100
4. 색상 대비             🟡 75/100
5. 포커스 관리           🟢 88/100
6. 스크린 리더 호환성    🟢 92/100

🔴 Critical Issues: 2개
⚠️  Warnings: 5개
✅ Pass: 18개
```

---

### WCAG 2.1 AA 검증 기준

#### 1. 시맨틱 HTML (Semantic HTML)

**필수 요구사항**:

```typescript
// ✅ 좋은 예: 시맨틱 태그 사용
<nav>
  <ul>
    <li><a href="/products">상품</a></li>
    <li><a href="/artists">아티스트</a></li>
  </ul>
</nav>

<main>
  <section>
    <h1>상품 목록</h1>
    <article>...</article>
  </section>
</main>

<footer>...</footer>

// ❌ 나쁜 예: div 남용
<div className="nav">
  <div className="nav-item">
    <div className="link">상품</div>
  </div>
</div>

<div className="main">
  <div className="section">
    <div className="title">상품 목록</div>
  </div>
</div>
```

**검증 항목**:
- [ ] `<nav>`, `<main>`, `<header>`, `<footer>`, `<article>`, `<section>` 사용
- [ ] 제목 태그 계층 구조 (`<h1>` → `<h2>` → `<h3>`)
- [ ] 리스트는 `<ul>`, `<ol>`, `<li>` 사용
- [ ] 버튼은 `<button>`, 링크는 `<a>` 사용

---

#### 2. ARIA 속성 (Accessible Rich Internet Applications)

**필수 ARIA 속성**:

```typescript
// ✅ aria-label (보이지 않는 텍스트)
<button aria-label="검색">
  <SearchIcon />
</button>

// ✅ aria-labelledby (다른 요소 참조)
<h2 id="section-title">상품 목록</h2>
<div aria-labelledby="section-title">
  ...
</div>

// ✅ aria-describedby (추가 설명)
<input
  type="email"
  aria-describedby="email-hint"
/>
<p id="email-hint">이메일 형식: example@email.com</p>

// ✅ aria-live (동적 콘텐츠)
<div aria-live="polite" aria-atomic="true">
  장바구니에 추가되었습니다
</div>

// ✅ aria-expanded (펼침/접힘 상태)
<button aria-expanded={isOpen}>
  메뉴
</button>

// ✅ aria-current (현재 페이지)
<a href="/products" aria-current="page">
  상품
</a>

// ✅ aria-hidden (스크린 리더 숨김)
<span aria-hidden="true">★</span>
```

**검증 항목**:
- [ ] 아이콘만 있는 버튼에 `aria-label` 추가
- [ ] 모달/다이얼로그에 `role="dialog"`, `aria-modal="true"`
- [ ] 탭에 `role="tablist"`, `role="tab"`, `role="tabpanel"`
- [ ] 동적 콘텐츠에 `aria-live` 사용
- [ ] 펼침/접힘 UI에 `aria-expanded`

---

#### 3. 키보드 접근성 (Keyboard Accessibility)

**필수 키보드 지원**:

```typescript
// ✅ Tab 순서
<button tabIndex={0}>클릭 가능</button>
<div role="button" tabIndex={0}>커스텀 버튼</div>
<div tabIndex={-1}>포커스 불가능</div>

// ✅ Enter/Space 키 지원
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick();
  }
};

<div
  role="button"
  tabIndex={0}
  onKeyDown={handleKeyDown}
  onClick={onClick}
>
  커스텀 버튼
</div>

// ✅ Escape 키로 모달 닫기
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  window.addEventListener('keydown', handleEscape);
  return () => window.removeEventListener('keydown', handleEscape);
}, []);

// ✅ 화살표 키로 탭 이동
const handleTabKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'ArrowRight') {
    focusNextTab();
  } else if (e.key === 'ArrowLeft') {
    focusPrevTab();
  }
};
```

**검증 항목**:
- [ ] 모든 인터랙티브 요소에 `tabIndex` 설정
- [ ] Enter/Space 키로 버튼 클릭 가능
- [ ] Escape 키로 모달/다이얼로그 닫기
- [ ] 화살표 키로 탭/메뉴 이동
- [ ] 포커스 트랩 (모달 내부 포커스 유지)

---

#### 4. 색상 대비 (Color Contrast)

**WCAG 2.1 AA 기준**:

- **일반 텍스트**: 최소 4.5:1
- **큰 텍스트 (18px 이상 또는 14px bold)**: 최소 3:1
- **UI 컴포넌트**: 최소 3:1

```typescript
// ✅ 충분한 대비
<p style={{ color: '#000000', background: '#FFFFFF' }}>
  대비율: 21:1 (AAA)
</p>

<p style={{ color: '#595959', background: '#FFFFFF' }}>
  대비율: 7.5:1 (AAA)
</p>

<p style={{ color: '#767676', background: '#FFFFFF' }}>
  대비율: 4.54:1 (AA 통과)
</p>

// ❌ 불충분한 대비
<p style={{ color: '#B2BBC8', background: '#FFFFFF' }}>
  대비율: 2.8:1 (실패) ❌
</p>

<p style={{ color: '#7E93A8', background: '#FFFFFF' }}>
  대비율: 3.2:1 (큰 텍스트만 통과)
</p>
```

**자동 검증**:

```bash
/ds app/components/ProductCard.tsx --a11y

# 출력
🔴 색상 대비 실패 (3개):
1. Line 42: #B2BBC8 / #FFFFFF → 2.8:1 (최소 4.5:1 필요)
   권장: #767676 이상 사용
2. Line 58: #7E93A8 / #FFFFFF → 3.2:1
   권장: text-18 이상 또는 더 진한 색상 사용
3. Line 95: #E93A86 / #FFFFFF → 3.1:1
   권장: 배경색 변경 또는 텍스트 더 진하게
```

**검증 항목**:
- [ ] 모든 텍스트 4.5:1 이상
- [ ] 큰 텍스트 3:1 이상
- [ ] 버튼/입력 필드 테두리 3:1 이상
- [ ] 비활성 상태도 대비 확인

---

#### 5. 포커스 관리 (Focus Management)

**필수 포커스 스타일**:

```typescript
// ✅ 포커스 링 (Focus Ring)
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  클릭
</button>

// ✅ 커스텀 포커스 스타일
<a
  className="focus:underline focus:outline-dashed focus:outline-2 focus:outline-offset-4"
>
  링크
</a>

// ❌ 포커스 스타일 제거 금지
<button className="focus:outline-none">
  ❌ 포커스 표시 없음
</button>

// ✅ 포커스 트랩 (모달)
import { useFocusTrap } from '@/hooks/useFocusTrap';

const Modal = () => {
  const trapRef = useFocusTrap(); // 자동 포커스 트랩

  return (
    <div ref={trapRef} role="dialog">
      <button>닫기</button>
      <input />
      <button>확인</button>
    </div>
  );
};

// ✅ 자동 포커스 (모달 열릴 때)
useEffect(() => {
  if (isOpen) {
    closeButtonRef.current?.focus();
  }
}, [isOpen]);
```

**검증 항목**:
- [ ] 모든 포커스 가능 요소에 시각적 표시
- [ ] `outline: none` 사용 시 대체 스타일 제공
- [ ] 모달 열릴 때 첫 번째 요소에 자동 포커스
- [ ] 모달 내부 포커스 트랩
- [ ] Tab 순서 논리적 (좌→우, 위→아래)

---

#### 6. 스크린 리더 호환성 (Screen Reader)

**필수 대응**:

```typescript
// ✅ 이미지 alt 텍스트
<img src="product.jpg" alt="나이키 에어맥스 운동화" />

// ❌ 장식 이미지는 빈 alt
<img src="decoration.svg" alt="" />
<img src="decoration.svg" role="presentation" />

// ✅ 숨김 텍스트 (visually-hidden)
<span className="sr-only">
  상품 3개가 장바구니에 담겼습니다
</span>

// ✅ 로딩 상태
<button disabled aria-busy="true">
  <Spinner aria-hidden="true" />
  <span className="sr-only">처리 중...</span>
</button>

// ✅ 에러 메시지
<input
  type="email"
  aria-invalid={!!error}
  aria-errormessage="email-error"
/>
{error && (
  <p id="email-error" role="alert">
    {error}
  </p>
)}

// ✅ 필수 입력 필드
<label htmlFor="email">
  이메일 <span aria-label="필수">*</span>
</label>
<input
  id="email"
  type="email"
  required
  aria-required="true"
/>
```

**검증 항목**:
- [ ] 모든 이미지에 적절한 `alt` 텍스트
- [ ] 폼 입력에 `<label>` 연결
- [ ] 에러 메시지에 `role="alert"`
- [ ] 로딩 상태에 `aria-busy`
- [ ] 숨김 콘텐츠에 `.sr-only` 클래스

---

### 접근성 리포트 예시

```markdown
# 접근성 검증 리포트: ProductCard.tsx

## 📊 전체 점수: 82/100 (AA 기준 통과) ✅

### 점수 상세
- 시맨틱 HTML: 90/100 🟢
- ARIA 속성: 75/100 🟡
- 키보드 접근성: 85/100 🟢
- 색상 대비: 70/100 🟡
- 포커스 관리: 88/100 🟢
- 스크린 리더: 92/100 🟢

---

## 🔴 Critical Issues (2개) - 즉시 수정

### 1. 색상 대비 불충분
**위치**: Line 42
**문제**: 텍스트 색상 대비 2.8:1 (최소 4.5:1 필요)
```tsx
// ❌ 현재
<p className="text-[#B2BBC8]">품절</p>

// ✅ 수정
<p className="text-[#767676]">품절</p>  // 대비 4.5:1
```

### 2. 버튼에 aria-label 누락
**위치**: Line 58
**문제**: 아이콘만 있는 버튼에 설명 없음
```tsx
// ❌ 현재
<button onClick={handleLike}>
  <HeartIcon />
</button>

// ✅ 수정
<button onClick={handleLike} aria-label="찜하기">
  <HeartIcon />
</button>
```

---

## ⚠️  Warnings (5개) - 개선 권장

### 1. 시맨틱 태그 미사용
**위치**: Line 12
```tsx
// ❌ 현재
<div className="product-container">...</div>

// ✅ 개선
<article className="product-container">...</article>
```

### 2. 키보드 접근성 누락
**위치**: Line 89
```tsx
// ❌ 현재
<div onClick={handleClick}>클릭</div>

// ✅ 개선
<button onClick={handleClick}>클릭</button>
// 또는
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  클릭
</div>
```

---

## ✅ 잘된 부분

- 이미지에 적절한 alt 텍스트 제공
- 폼 입력에 label 올바르게 연결
- 포커스 스타일 명확하게 표시

---

## 💡 개선 가이드

### 1. 색상 대비 개선
프로젝트에서 자주 사용하는 색상의 대비:

| 색상      | 배경 #FFFFFF | AA 통과 | AAA 통과 |
| --------- | ------------ | ------- | -------- |
| #000000   | 21:1         | ✅      | ✅       |
| #595959   | 7.5:1        | ✅      | ✅       |
| #767676   | 4.5:1        | ✅      | ❌       |
| #7E93A8   | 3.2:1        | ❌      | ❌       |
| #B2BBC8   | 2.8:1        | ❌      | ❌       |

**권장**: #767676 이상 사용

### 2. Tailwind 유틸리티 클래스

```tsx
// 스크린 리더 전용 텍스트
<span className="sr-only">설명</span>

// 포커스 링
<button className="focus:ring-2 focus:ring-blue-500">
  버튼
</button>
```
```

---

### 접근성 체크리스트

#### 필수 항목 (AA 기준)

- [ ] **1.1.1** 비텍스트 콘텐츠에 대체 텍스트 제공
- [ ] **1.3.1** 정보와 관계를 프로그래밍 방식으로 결정
- [ ] **1.4.3** 색상 대비 최소 4.5:1 (텍스트)
- [ ] **2.1.1** 모든 기능을 키보드로 사용 가능
- [ ] **2.1.2** 키보드 포커스 트랩 방지
- [ ] **2.4.3** 논리적인 포커스 순서
- [ ] **2.4.7** 포커스 표시 명확
- [ ] **3.2.2** 입력 시 예상치 못한 맥락 변화 없음
- [ ] **3.3.1** 에러 식별 및 설명
- [ ] **3.3.2** 레이블 또는 지시사항 제공
- [ ] **4.1.2** 이름, 역할, 값 프로그래밍 방식으로 결정
- [ ] **4.1.3** 상태 메시지 전달

---

### 자동 검증 도구 통합

```bash
# axe-core 통합
/ds app/components/ProductCard.tsx --a11y --tool=axe

# Pa11y 통합
/ds app/components/ProductCard.tsx --a11y --tool=pa11y

# Lighthouse 접근성 점수
/ds app/components/ProductCard.tsx --a11y --tool=lighthouse
```

---

## 📚 참고 자료

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
