---
name: docs
description:
  코드를 분석하여 JSDoc, Storybook, README를 자동 생성합니다. Props 명세, 사용 예시, API 문서 포함
disable-model-invocation: false
user-invocable: true
---

# 기술 문서 자동화 (Docs Builder)

코드를 분석하여 기술 문서를 자동 생성합니다.

## 🎯 생성 가능한 문서

### 1. JSDoc (TypeScript 주석)

- Props 타입 설명
- 함수 파라미터/리턴값
- 사용 예시
- 주의사항

### 2. Storybook Stories

- 컴포넌트 스토리
- Args 설정
- Controls
- Variants (상태별 예시)

### 3. README.md

- 컴포넌트 개요
- 설치 방법
- 사용 방법
- Props Table
- 예시 코드

### 4. API 문서

- 엔드포인트 명세
- Request/Response 스키마
- 에러 코드
- 사용 예시 (cURL)

## 📝 JSDoc 생성

### React 컴포넌트 JSDoc

#### 입력 (컴포넌트)

```typescript
type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children
}: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
```

#### 출력 (JSDoc 추가)

````typescript
/**
 * 프로젝트 공통 버튼 컴포넌트
 *
 * @remarks
 * 디자인 시스템의 버튼 스타일을 따르며, 다양한 variant와 size를 지원합니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Button onClick={() => alert('클릭!')}>
 *   클릭하세요
 * </Button>
 *
 * // Secondary 버튼
 * <Button variant="secondary" size="lg">
 *   큰 버튼
 * </Button>
 *
 * // 비활성화 버튼
 * <Button disabled>
 *   비활성화됨
 * </Button>
 * ```
 *
 * @see {@link https://storybook.example.com/?path=/docs/button} Storybook 문서
 */

/**
 * Button 컴포넌트의 Props
 */
type ButtonProps = {
  /**
   * 버튼 스타일 variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';

  /**
   * 버튼 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;

  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;

  /**
   * 버튼 내부 컨텐츠
   */
  children: React.ReactNode;
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children
}: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
````

### Custom Hook JSDoc

#### 입력 (Hook)

```typescript
export const useProductQuery = (productId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
  });

  return { data, isLoading, error };
};
```

#### 출력 (JSDoc 추가)

````typescript
/**
 * 상품 정보를 조회하는 Custom Hook
 *
 * @param productId - 조회할 상품 ID
 * @returns 상품 데이터, 로딩 상태, 에러
 *
 * @example
 * ```tsx
 * function ProductPage({ productId }) {
 *   const { data, isLoading, error } = useProductQuery(productId);
 *
 *   if (isLoading) return <div>로딩 중...</div>;
 *   if (error) return <div>에러 발생</div>;
 *
 *   return <div>{data.name}</div>;
 * }
 * ```
 *
 * @remarks
 * - React Query를 사용하여 캐싱 및 재요청 자동 처리
 * - staleTime: 5분
 * - cacheTime: 10분
 *
 * @throws {Error} 상품을 찾을 수 없는 경우
 */
export const useProductQuery = (productId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
  });

  return { data, isLoading, error };
};
````

## 📚 Storybook Story 생성

### 입력 (컴포넌트)

```typescript
type ProductCardProps = {
  name: string;
  price: number;
  image: string;
  onAddToCart?: () => void;
};

export const ProductCard = ({ name, price, image, onAddToCart }: ProductCardProps) => {
  return (
    <div>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price}원</p>
      <button onClick={onAddToCart}>장바구니</button>
    </div>
  );
};
```

### 출력 (Storybook Story)

```typescript
// ProductCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';

const meta = {
  title: 'Components/Product/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '상품명',
    },
    price: {
      control: 'number',
      description: '가격 (원)',
    },
    image: {
      control: 'text',
      description: '상품 이미지 URL',
    },
    onAddToCart: {
      action: 'addToCart',
      description: '장바구니 추가 이벤트',
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 상품 카드
 */
export const Default: Story = {
  args: {
    name: '아이폰 15 Pro',
    price: 1490000,
    image: 'https://via.placeholder.com/300',
  },
};

/**
 * 할인 상품
 */
export const Sale: Story = {
  args: {
    name: '맥북 프로 14인치',
    price: 2390000,
    image: 'https://via.placeholder.com/300',
  },
};

/**
 * 품절 상품
 */
export const SoldOut: Story = {
  args: {
    name: 'AirPods Pro 2',
    price: 359000,
    image: 'https://via.placeholder.com/300',
  },
  // 추가 상태 표시 로직...
};

/**
 * 모든 상태 (Variants)
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <ProductCard
        name="기본"
        price={100000}
        image="https://via.placeholder.com/300"
      />
      <ProductCard
        name="할인"
        price={80000}
        image="https://via.placeholder.com/300"
      />
      <ProductCard
        name="품절"
        price={120000}
        image="https://via.placeholder.com/300"
      />
    </div>
  ),
};
```

## 📄 README.md 생성

### 입력 (컴포넌트)

```typescript
type AlertProps = {
  type?: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  onClose?: () => void;
};

export const Alert = ({ type = 'info', title, message, onClose }: AlertProps) => {
  // ...
};
```

### 출력 (README.md)

````markdown
# Alert

공통 알림 컴포넌트입니다. 정보, 성공, 경고, 에러 메시지를 표시할 수 있습니다.

## 📦 설치

```bash
# 프로젝트 내부 컴포넌트 (설치 불필요)
import { Alert } from '@/components/Alert';
```
````

## 🚀 사용법

### 기본 사용

```tsx
import { Alert } from '@/components/Alert';

export const Example = () => {
  return <Alert type='success' title='성공' message='작업이 성공적으로 완료되었습니다.' />;
};
```

### 닫기 버튼 포함

```tsx
<Alert
  type='error'
  title='오류'
  message='문제가 발생했습니다.'
  onClose={() => console.log('닫기')}
/>
```

## 📋 Props

| Prop      | Type                                          | Default  | Required | Description           |
| --------- | --------------------------------------------- | -------- | -------- | --------------------- |
| `type`    | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | ❌       | 알림 타입             |
| `title`   | `string`                                      | -        | ✅       | 알림 제목             |
| `message` | `string`                                      | -        | ✅       | 알림 메시지           |
| `onClose` | `() => void`                                  | -        | ❌       | 닫기 버튼 클릭 핸들러 |

## 🎨 Variants

### Info (기본)

```tsx
<Alert type='info' title='안내' message='정보를 확인하세요.' />
```

### Success

```tsx
<Alert type='success' title='성공' message='저장되었습니다.' />
```

### Warning

```tsx
<Alert type='warning' title='경고' message='주의가 필요합니다.' />
```

### Error

```tsx
<Alert type='error' title='오류' message='문제가 발생했습니다.' />
```

## 🎯 실전 예시

### Form 제출 후 성공 메시지

```tsx
const [showAlert, setShowAlert] = useState(false);

const handleSubmit = async () => {
  try {
    await submitForm();
    setShowAlert(true);
  } catch (error) {
    // 에러 처리
  }
};

return (
  <>
    {showAlert && (
      <Alert
        type='success'
        title='제출 완료'
        message='폼이 성공적으로 제출되었습니다.'
        onClose={() => setShowAlert(false)}
      />
    )}
    <form onSubmit={handleSubmit}>...</form>
  </>
);
```

## 📚 참고 자료

- [Storybook 문서](https://storybook.example.com/?path=/docs/alert)
- [디자인 시스템 가이드](./design-system.md)

## 🔗 관련 컴포넌트

- `Toast` - 자동으로 사라지는 알림
- `Modal` - 모달 형태 알림
- `Banner` - 페이지 상단 고정 알림

````

## 🌐 API 문서 생성

### 입력 (API Route)
```typescript
// app/api/products/route.ts
export async function GET(request: NextRequest) {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { data, error } = await supabase.from('products').insert(body);
  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
````

### 출력 (API 문서)

```markdown
# Products API

상품 관련 API입니다.

## 📍 Base URL
```

https://api.example.com/api/products

````

## 🔐 인증

모든 요청에는 인증 토큰이 필요합니다.

```bash
Authorization: Bearer YOUR_TOKEN
````

---

## GET /api/products

상품 목록을 조회합니다.

### Request

**Query Parameters**

| Parameter | Type     | Required | Description                              |
| --------- | -------- | -------- | ---------------------------------------- |
| `status`  | `string` | ❌       | 상품 상태 필터 (`available`, `sold_out`) |
| `page`    | `number` | ❌       | 페이지 번호 (기본값: 1)                  |
| `limit`   | `number` | ❌       | 페이지 크기 (기본값: 10)                 |

### Response

**200 OK**

```json
[
  {
    "id": 1,
    "name": "아이폰 15 Pro",
    "price": 1490000,
    "status": "available",
    "created_at": "2024-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "name": "맥북 프로",
    "price": 2390000,
    "status": "available",
    "created_at": "2024-01-02T00:00:00Z"
  }
]
```

**500 Internal Server Error**

```json
{
  "error": "서버 오류가 발생했습니다."
}
```

### Example (cURL)

```bash
# 전체 목록 조회
curl -X GET https://api.example.com/api/products

# 필터 적용
curl -X GET "https://api.example.com/api/products?status=available&page=1&limit=10"
```

### Example (JavaScript)

```typescript
const response = await fetch('/api/products?status=available');
const products = await response.json();
```

---

## POST /api/products

새 상품을 생성합니다.

### Request

**Body (JSON)**

```json
{
  "name": "아이폰 15 Pro",
  "price": 1490000,
  "description": "최신 아이폰",
  "stock": 100
}
```

**Required Fields**

| Field         | Type     | Description |
| ------------- | -------- | ----------- |
| `name`        | `string` | 상품명      |
| `price`       | `number` | 가격 (원)   |
| `description` | `string` | 상품 설명   |
| `stock`       | `number` | 재고 수량   |

### Response

**201 Created**

```json
{
  "id": 3,
  "name": "아이폰 15 Pro",
  "price": 1490000,
  "description": "최신 아이폰",
  "stock": 100,
  "created_at": "2024-01-03T00:00:00Z"
}
```

**400 Bad Request**

```json
{
  "error": "필수 필드가 누락되었습니다."
}
```

**401 Unauthorized**

```json
{
  "error": "로그인이 필요합니다."
}
```

### Example (cURL)

```bash
curl -X POST https://api.example.com/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "아이폰 15 Pro",
    "price": 1490000,
    "description": "최신 아이폰",
    "stock": 100
  }'
```

### Example (JavaScript)

```typescript
const response = await fetch('/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: '아이폰 15 Pro',
    price: 1490000,
    description: '최신 아이폰',
    stock: 100,
  }),
});

const product = await response.json();
```

---

## 🚨 에러 코드

| Code | Message               | Description                  |
| ---- | --------------------- | ---------------------------- |
| 400  | Bad Request           | 잘못된 요청 (필수 필드 누락) |
| 401  | Unauthorized          | 인증 필요                    |
| 403  | Forbidden             | 권한 없음                    |
| 404  | Not Found             | 리소스를 찾을 수 없음        |
| 500  | Internal Server Error | 서버 오류                    |

---

## 📚 참고 자료

- [인증 가이드](./auth.md)
- [API 사용 예시](./examples.md)

````

## 🚀 사용 예시

```bash
# JSDoc 생성 (컴포넌트)
/docs app/components/Button.tsx --type jsdoc

# Storybook Story 생성
/docs app/components/ProductCard.tsx --type storybook

# README 생성
/docs app/components/Alert.tsx --type readme

# API 문서 생성
/docs app/api/products/route.ts --type api

# 모두 생성
/docs app/components/Button.tsx --type all
````

## 📋 문서화 체크리스트

### 컴포넌트

- [ ] JSDoc 추가 (Props 설명)
- [ ] 사용 예시 코드
- [ ] Storybook Story
- [ ] README.md
- [ ] Props Table

### Custom Hook

- [ ] JSDoc 추가 (파라미터/리턴값)
- [ ] 사용 예시
- [ ] 주의사항 (@remarks)
- [ ] 에러 처리 (@throws)

### API Route

- [ ] 엔드포인트 명세
- [ ] Request/Response 스키마
- [ ] 에러 코드 정의
- [ ] cURL 예시
- [ ] JavaScript 예시

## 💡 문서화 원칙

1. **명확성**: 누구나 이해할 수 있도록 간결하게
2. **예시 제공**: 실제 사용 가능한 코드 예시
3. **최신 유지**: 코드 변경 시 문서도 함께 업데이트
4. **일관성**: 동일한 형식과 구조 사용

## 🔗 참고 자료

- [TSDoc](https://tsdoc.org/)
- [Storybook](https://storybook.js.org/)
- [JSDoc](https://jsdoc.app/)
- [API Documentation Best Practices](https://swagger.io/resources/articles/best-practices-in-api-documentation/)
