---
name: api
description:
  Swagger/OpenAPI 기반 TypeScript 타입, API 함수, React Query 훅 자동 생성. Supabase CRUD API도
  지원. 타입 검증 및 변경 사항 자동 감지
disable-model-invocation: false
user-invocable: true
---

# API 자동 생성 & 관리 시스템

Swagger/OpenAPI 문서를 기반으로 TypeScript 타입, API 함수, React Query 훅을 자동 생성하고
관리합니다.

## 🎯 목적

- **Swagger 기반 자동 생성**: TypeScript 타입 + API 함수 + React Query 훅
- **타입 안전성 보장**: 100% 타입 세이프한 API 호출
- **변경 사항 자동 감지**: Swagger 업데이트 자동 추적
- **타입 검증**: 현재 코드와 Swagger 일치 여부 확인
- **Supabase CRUD**: 기존 Supabase 기반 API Route 생성 유지

## 🌟 새로운 기능: Swagger 기반 자동 생성

### 사용 방법

```bash
# 기본 생성 (Swagger → 타입 + API + 훅)
/api brands --from-swagger

# 변경 사항 확인
/api brands --diff

# 자동 업데이트
/api brands --update

# 타입 검증
/api brands --validate

# 전체 API 검증
/api --validate-all
```

### 생성되는 파일

```
app/api/brands/
├── types.ts                    # TypeScript 타입 정의
├── client.ts                   # API 함수 (axios 기반)
├── hooks/
│   ├── useBrands.ts           # React Query 훅 (목록)
│   ├── useBrand.ts            # React Query 훅 (상세)
│   ├── useCreateBrand.ts      # React Query Mutation (생성)
│   └── useUpdateBrand.ts      # React Query Mutation (수정)
└── route.ts                   # Next.js API Route (선택)
```

### Swagger API URL 설정

프로젝트 루트에 `.swagger.config.json` 생성:

```json
{
  "baseUrl": "https://novera-shop-api.lingdot.co.kr",
  "docsUrl": "/v3/api-docs/webapp",
  "endpoints": {
    "brands": "/api/brands",
    "products": "/api/products",
    "categories": "/api/categories"
  }
}
```

---

## 📋 RESTful API 규칙

### HTTP 메서드 매핑

| 작업      | HTTP 메서드 | 엔드포인트       | 파일 위치                     |
| --------- | ----------- | ---------------- | ----------------------------- |
| 목록 조회 | GET         | `/api/books`     | `app/api/books/route.ts`      |
| 상세 조회 | GET         | `/api/books/:id` | `app/api/books/[id]/route.ts` |
| 생성      | POST        | `/api/books`     | `app/api/books/route.ts`      |
| 수정      | PATCH       | `/api/books/:id` | `app/api/books/[id]/route.ts` |
| 삭제      | DELETE      | `/api/books/:id` | `app/api/books/[id]/route.ts` |

## 🏗️ 파일 구조

```
app/api/
├── books/
│   ├── route.ts              # GET (목록), POST (생성)
│   └── [id]/
│       └── route.ts          # GET (상세), PATCH (수정), DELETE (삭제)
```

## 📝 Swagger 기반 생성 템플릿

### 1. TypeScript 타입 생성 (`app/api/brands/types.ts`)

**Swagger 응답 예시**:

```json
{
  "brandId": 1,
  "name": "Apple",
  "description": "Think Different",
  "imageUrl": "https://example.com/apple.png",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**자동 생성된 타입**:

```typescript
/**
 * 브랜드 엔티티
 * @generated from Swagger: GET /api/brands
 */
export type Brand = {
  /** 브랜드 ID */
  brandId: number;
  /** 브랜드명 */
  name: string;
  /** 설명 */
  description?: string;
  /** 이미지 URL */
  imageUrl?: string;
  /** 활성화 여부 */
  isActive: boolean;
  /** 생성일 */
  createdAt: string;
};

/**
 * 브랜드 목록 응답
 */
export type GetBrandsResponse = Brand[];

/**
 * 브랜드 상세 응답
 */
export type GetBrandResponse = Brand;

/**
 * 브랜드 생성 요청
 */
export type CreateBrandRequest = {
  name: string;
  description?: string;
  imageUrl?: string;
};

/**
 * 브랜드 수정 요청
 */
export type UpdateBrandRequest = Partial<CreateBrandRequest>;
```

---

### 2. API 함수 생성 (`app/api/brands/client.ts`)

**자동 생성된 API 함수**:

```typescript
import { apiClient } from '@/shared/api/client';
import type {
  Brand,
  GetBrandsResponse,
  GetBrandResponse,
  CreateBrandRequest,
  UpdateBrandRequest,
} from './types';

/**
 * 브랜드 API 클라이언트
 * @generated from Swagger
 */
export const brandsApi = {
  /**
   * 브랜드 목록 조회
   * @endpoint GET /api/brands
   */
  getBrands: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<GetBrandsResponse> => {
    const response = await apiClient.get<GetBrandsResponse>('/brands', {
      params,
    });
    return response.data;
  },

  /**
   * 브랜드 상세 조회
   * @endpoint GET /api/brands/:id
   */
  getBrand: async (id: number): Promise<GetBrandResponse> => {
    const response = await apiClient.get<GetBrandResponse>(`/brands/${id}`);
    return response.data;
  },

  /**
   * 브랜드 생성
   * @endpoint POST /api/brands
   */
  createBrand: async (data: CreateBrandRequest): Promise<Brand> => {
    const response = await apiClient.post<Brand>('/brands', data);
    return response.data;
  },

  /**
   * 브랜드 수정
   * @endpoint PATCH /api/brands/:id
   */
  updateBrand: async (id: number, data: UpdateBrandRequest): Promise<Brand> => {
    const response = await apiClient.patch<Brand>(`/brands/${id}`, data);
    return response.data;
  },

  /**
   * 브랜드 삭제
   * @endpoint DELETE /api/brands/:id
   */
  deleteBrand: async (id: number): Promise<void> => {
    await apiClient.delete(`/brands/${id}`);
  },
};
```

---

### 3. React Query 훅 생성 (`app/api/brands/hooks/`)

**목록 조회 훅** (`useBrands.ts`):

```typescript
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { brandsApi } from '../client';
import type { GetBrandsResponse } from '../types';

/**
 * 브랜드 목록 조회 훅
 * @generated from Swagger
 */
export const useBrands = (
  params?: {
    page?: number;
    limit?: number;
    search?: string;
  },
  options?: Omit<UseQueryOptions<GetBrandsResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['brands', params],
    queryFn: () => brandsApi.getBrands(params),
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 10 * 60 * 1000, // 10분
    ...options,
  });
};
```

**상세 조회 훅** (`useBrand.ts`):

```typescript
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { brandsApi } from '../client';
import type { GetBrandResponse } from '../types';

/**
 * 브랜드 상세 조회 훅
 * @generated from Swagger
 */
export const useBrand = (
  id: number,
  options?: Omit<UseQueryOptions<GetBrandResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['brand', id],
    queryFn: () => brandsApi.getBrand(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
```

**생성 Mutation 훅** (`useCreateBrand.ts`):

```typescript
import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { brandsApi } from '../client';
import type { Brand, CreateBrandRequest } from '../types';

/**
 * 브랜드 생성 훅
 * @generated from Swagger
 */
export const useCreateBrand = (
  options?: Omit<UseMutationOptions<Brand, Error, CreateBrandRequest>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brandsApi.createBrand,
    onSuccess: (data) => {
      // 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    ...options,
  });
};
```

**수정 Mutation 훅** (`useUpdateBrand.ts`):

```typescript
import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { brandsApi } from '../client';
import type { Brand, UpdateBrandRequest } from '../types';

/**
 * 브랜드 수정 훅
 * @generated from Swagger
 */
export const useUpdateBrand = (
  id: number,
  options?: Omit<UseMutationOptions<Brand, Error, UpdateBrandRequest>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => brandsApi.updateBrand(id, data),
    onSuccess: (data) => {
      // 상세 캐시 업데이트
      queryClient.setQueryData(['brand', id], data);
      // 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    ...options,
  });
};
```

---

## 📝 Supabase 기반 생성 템플릿

### 1. 목록/생성 API (`app/api/books/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/config/supabase/server';

// GET /api/books?status=reading
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    let query = supabase.from('books').select('*').order('created_at', { ascending: false });

    // 필터 적용
    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// POST /api/books
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    // 인증 확인
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    // 데이터 검증
    if (!body.title) {
      return NextResponse.json({ error: '제목은 필수입니다.' }, { status: 400 });
    }

    // 데이터 생성
    const { data, error } = await supabase
      .from('books')
      .insert({
        ...body,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
```

### 2. 상세/수정/삭제 API (`app/api/books/[id]/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/config/supabase/server';

type Params = {
  params: Promise<{ id: string }>;
};

// GET /api/books/:id
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    const { data, error } = await supabase.from('books').select('*').eq('id', id).single();

    if (error) {
      return NextResponse.json({ error: '데이터를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// PATCH /api/books/:id
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const body = await request.json();

    // 인증 확인
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    // 권한 확인 (본인 데이터인지)
    const { data: book } = await supabase.from('books').select('user_id').eq('id', id).single();

    if (book?.user_id !== user.id) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
    }

    // 데이터 수정
    const { data, error } = await supabase
      .from('books')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// DELETE /api/books/:id
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    // 인증 확인
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    // 권한 확인
    const { data: book } = await supabase.from('books').select('user_id').eq('id', id).single();

    if (book?.user_id !== user.id) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
    }

    // 데이터 삭제
    const { error } = await supabase.from('books').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: '삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
```

## 🔄 변경 사항 감지 & 업데이트

### 1. 변경 사항 확인 (`--diff`)

**사용법**:

```bash
/api brands --diff
```

**출력 예시**:

```markdown
# Swagger 변경 사항 감지: brands

## 🆕 추가된 필드

### Brand 타입

- category: string (optional)
  - 설명: 브랜드 카테고리
- isActive: boolean (required)
  - 설명: 활성화 여부

## 🔄 변경된 필드

### Brand 타입

- imageUrl: string → string | null
  - 이유: Nullable 처리

## 🗑️ 삭제된 필드

### Brand 타입

- oldField: string
  - 경고: 기존 코드에서 사용 중일 수 있음

## ✨ 새 엔드포인트

- POST /api/brands/{id}/activate
  - 설명: 브랜드 활성화

## 🚫 삭제된 엔드포인트

- PUT /api/brands/{id}
  - 대체: PATCH 사용 권장

## 📊 변경 요약

- 필드 추가: 2개
- 필드 변경: 1개
- 필드 삭제: 1개
- 엔드포인트 추가: 1개
- 엔드포인트 삭제: 1개

## 💡 액션 필요

1. Brand.category 필드를 타입에 추가
2. Brand.imageUrl을 nullable로 변경
3. useActivateBrand 훅 생성
4. PUT 엔드포인트 사용 코드를 PATCH로 변경
```

---

### 2. 자동 업데이트 (`--update`)

**사용법**:

```bash
/api brands --update
```

**동작 과정**:

1. ✅ Swagger 문서 파싱
2. ✅ 현재 타입과 비교
3. ✅ 변경 사항 감지
4. ✅ 타입 파일 자동 업데이트
5. ✅ API 함수 추가/수정
6. ✅ React Query 훅 업데이트
7. ✅ 변경 사항 리포트 생성

**출력 예시**:

```markdown
# 자동 업데이트 완료: brands

## ✅ 업데이트된 파일

1. app/api/brands/types.ts
   - Brand.category 필드 추가
   - Brand.imageUrl 타입 변경 (string → string | null)

2. app/api/brands/client.ts
   - activateBrand 함수 추가

3. app/api/brands/hooks/useActivateBrand.ts
   - 새 파일 생성

## ⚠️ 수동 확인 필요

- Brand.oldField가 삭제되었습니다
  - 영향 받는 파일:
    - app/components/BrandCard.tsx (Line 42)
    - app/(main)/brands/page.tsx (Line 18)
  - 조치: 해당 필드를 제거하거나 대체 로직 구현

## 📊 업데이트 요약

- 자동 수정: 3개 파일
- 수동 확인: 2개 파일
- 총 변경 라인: 47줄
```

---

### 3. 타입 검증 (`--validate`)

**사용법**:

```bash
/api brands --validate
```

**검증 항목**:

```markdown
# 타입 검증 리포트: brands

## ✅ 일치하는 필드 (8/10)

- Brand.brandId: number ✓
- Brand.name: string ✓
- Brand.description: string | undefined ✓
- Brand.isActive: boolean ✓
- Brand.createdAt: string ✓
- brandsApi.getBrands: ✓
- brandsApi.getBrand: ✓
- brandsApi.createBrand: ✓

## ❌ 불일치하는 필드 (2/10)

### 1. Brand.imageUrl

- **현재 타입**: string
- **Swagger 타입**: string | null
- **위치**: app/api/brands/types.ts:8
- **수정 필요**: `imageUrl?: string;` → `imageUrl?: string | null;`

### 2. Brand.category

- **현재 상태**: 타입에 없음
- **Swagger**: string (optional)
- **위치**: app/api/brands/types.ts
- **수정 필요**: 필드 추가

## 🚫 누락된 API 함수

### brandsApi.activateBrand

- **엔드포인트**: POST /api/brands/:id/activate
- **위치**: app/api/brands/client.ts
- **수정 필요**: 함수 추가

## 📊 검증 요약

- **일치율**: 80% (8/10)
- **즉시 수정 필요**: 2개
- **누락 API**: 1개
- **전체 상태**: ⚠️ 개선 필요

## 💡 권장 조치

1. `/api brands --update` 실행 (자동 수정)
2. 수동 확인 항목 검토
```

---

### 4. 전체 API 검증 (`--validate-all`)

**사용법**:

```bash
/api --validate-all
```

**출력 예시**:

```markdown
# 전체 API 타입 검증 리포트

## 📊 전체 요약

| API        | 일치율       | 상태         | 수정 필요 |
| ---------- | ------------ | ------------ | --------- |
| brands     | 80% (8/10)   | ⚠️ 개선 필요 | 2개       |
| products   | 95% (19/20)  | ✅ 양호      | 1개       |
| categories | 100% (12/12) | ✅ 완벽      | 0개       |
| orders     | 70% (14/20)  | 🔴 불량      | 6개       |

## 🎯 우선순위

### 🔴 High (즉시 조치)

- orders: 30% 불일치 (6개 필드)

### 🟡 Medium (1주 내)

- brands: 20% 불일치 (2개 필드)
- products: 5% 불일치 (1개 필드)

### 🟢 Low (유지)

- categories: 100% 일치

## 💡 전체 권장 조치

1. orders API 우선 수정: `/api orders --update`
2. brands API 수정: `/api brands --update`
3. products API 검토: `/api products --validate`
4. CI/CD에 검증 추가: `npm run api:validate`
```

---

## 🎯 실행 예시

### Swagger 기반 생성

```bash
# 기본 생성 (타입 + API + 훅)
/api brands --from-swagger

# 변경 사항 확인
/api brands --diff

# 자동 업데이트
/api brands --update

# 타입 검증
/api brands --validate

# 전체 검증
/api --validate-all
```

### Supabase CRUD 생성 (기존 방식)

```bash
# 기본 CRUD API 생성
/api products

# 생성 결과:
# app/api/products/route.ts (GET 목록, POST 생성)
# app/api/products/[id]/route.ts (GET 상세, PATCH 수정, DELETE 삭제)
```

### 특정 메서드만 생성

```bash
# GET만 생성
/api products --methods GET

# POST, PATCH만 생성
/api products --methods POST,PATCH
```

### 인증 불필요한 API

```bash
# 공개 API (인증 체크 제외)
/api products --public
```

## 📊 HTTP 상태 코드

| 코드 | 의미                  | 사용 케이스                  |
| ---- | --------------------- | ---------------------------- |
| 200  | OK                    | 성공 (GET, PATCH, DELETE)    |
| 201  | Created               | 생성 성공 (POST)             |
| 400  | Bad Request           | 잘못된 요청 (필수 필드 누락) |
| 401  | Unauthorized          | 인증 필요 (로그인 안 함)     |
| 403  | Forbidden             | 권한 없음 (본인 데이터 아님) |
| 404  | Not Found             | 데이터 없음                  |
| 500  | Internal Server Error | 서버 오류                    |

## 🔒 보안 체크리스트

- [ ] **인증 확인**: `supabase.auth.getUser()`
- [ ] **권한 확인**: 본인 데이터인지 검증
- [ ] **데이터 검증**: 필수 필드 확인
- [ ] **SQL Injection 방지**: Supabase ORM 사용
- [ ] **에러 메시지**: 민감한 정보 노출 금지

## 💡 고급 기능

### 1. 페이지네이션

```typescript
// GET /api/books?page=1&limit=10
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('books')
    .select('*', { count: 'exact' })
    .range(from, to);

  return NextResponse.json({
    data,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count || 0) / limit),
    },
  });
}
```

### 2. 정렬

```typescript
// GET /api/books?sortBy=created_at&order=desc
const sortBy = searchParams.get('sortBy') || 'created_at';
const order = searchParams.get('order') || 'desc';

const { data } = await supabase
  .from('books')
  .select('*')
  .order(sortBy, { ascending: order === 'asc' });
```

### 3. 검색

```typescript
// GET /api/books?search=반지의제왕
const search = searchParams.get('search');

let query = supabase.from('books').select('*');

if (search) {
  query = query.ilike('title', `%${search}%`);
}
```

## 🧪 테스트 예시

### cURL 테스트

```bash
# 목록 조회
curl http://localhost:3000/api/books

# 생성
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title": "반지의 제왕", "author": "톨킨"}'

# 수정
curl -X PATCH http://localhost:3000/api/books/123 \
  -H "Content-Type: application/json" \
  -d '{"status": "read"}'

# 삭제
curl -X DELETE http://localhost:3000/api/books/123
```

## 🚀 실전 워크플로우

### 시나리오 1: 새 API 추가 (Swagger 있음)

```bash
# 1단계: Swagger에서 생성
/api brands --from-swagger

# 생성 결과:
# ✅ app/api/brands/types.ts
# ✅ app/api/brands/client.ts
# ✅ app/api/brands/hooks/useBrands.ts
# ✅ app/api/brands/hooks/useBrand.ts
# ✅ app/api/brands/hooks/useCreateBrand.ts

# 2단계: 컴포넌트에서 사용
# app/components/BrandList.tsx
import { useBrands } from '@/api/brands/hooks/useBrands';

export const BrandList = () => {
  const { data, isLoading } = useBrands();
  // ...
};
```

### 시나리오 2: API 업데이트 확인 (주기적)

```bash
# 매주 월요일 아침
/api brands --diff

# 변경 사항이 있으면
/api brands --update

# 커밋
git add .
/commit
git commit -m "생성된 메시지"
```

### 시나리오 3: PR 전 검증

```bash
# PR 생성 전 전체 검증
/api --validate-all

# 불일치 발견 시
/api brands --update
/api products --update

# 재검증
/api --validate-all
# → 100% 일치 확인 후 PR 생성
```

### 시나리오 4: CI/CD 통합

```json
// package.json
{
  "scripts": {
    "api:validate": "claude /api --validate-all",
    "api:update": "claude /api --update-all",
    "precommit": "npm run api:validate"
  }
}
```

```yaml
# .github/workflows/api-check.yml
name: API Type Check

on: [pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Validate API Types
        run: npm run api:validate
```

---

## 📚 사용 가이드

### 1. 초기 설정

**Step 1**: Swagger 설정 파일 생성

```json
// .swagger.config.json
{
  "baseUrl": "https://novera-shop-api.lingdot.co.kr",
  "docsUrl": "/v3/api-docs/webapp",
  "endpoints": {
    "brands": "/api/brands",
    "products": "/api/products"
  }
}
```

**Step 2**: API 클라이언트 설정 확인

```typescript
// app/shared/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://novera-shop-api.lingdot.co.kr',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 2. 첫 API 생성

```bash
# brands API 생성
/api brands --from-swagger

# 생성 확인
ls app/api/brands/
# → types.ts, client.ts, hooks/
```

### 3. 컴포넌트에서 사용

```typescript
// app/components/BrandList.tsx
'use client';

import { useBrands } from '@/api/brands/hooks/useBrands';
import { useCreateBrand } from '@/api/brands/hooks/useCreateBrand';

export const BrandList = () => {
  const { data: brands, isLoading } = useBrands();
  const createBrand = useCreateBrand();

  const handleCreate = () => {
    createBrand.mutate({
      name: 'New Brand',
      description: 'Description',
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {brands?.map((brand) => (
        <div key={brand.brandId}>{brand.name}</div>
      ))}
      <button onClick={handleCreate}>Add Brand</button>
    </div>
  );
};
```

### 4. 주기적 검증 (추천)

```bash
# 매주 또는 배포 전
/api --validate-all

# 불일치 발견 시 자동 수정
/api brands --update
```

---

## 🎯 명령어 옵션 정리

| 옵션             | 설명              | 예시                               |
| ---------------- | ----------------- | ---------------------------------- |
| `--from-swagger` | Swagger 기반 생성 | `/api brands --from-swagger`       |
| `--diff`         | 변경 사항 확인    | `/api brands --diff`               |
| `--update`       | 자동 업데이트     | `/api brands --update`             |
| `--validate`     | 타입 검증         | `/api brands --validate`           |
| `--validate-all` | 전체 검증         | `/api --validate-all`              |
| `--methods`      | 특정 메서드만     | `/api products --methods GET,POST` |
| `--public`       | 인증 불필요       | `/api products --public`           |

---

## 📌 주의사항

### Swagger 기반 생성

1. **Swagger 문서 접근**: API 문서가 공개되어 있어야 함
2. **타입 매핑**: Swagger 타입 → TypeScript 타입 자동 변환
3. **변경 감지**: 정기적으로 `--diff` 실행 권장 (주 1회)
4. **충돌 방지**: 수동 수정한 코드는 주석으로 표시

### Supabase CRUD

1. **Params 타입**: Next.js 16에서 `params`는 `Promise` 타입
2. **인증 토큰**: Supabase 자동 처리 (쿠키 기반)
3. **CORS**: 필요 시 별도 설정
4. **Rate Limiting**: 프로덕션 환경에서 추가 권장

---

## 🔗 참고

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [OpenAPI Specification](https://swagger.io/specification/)
- 프로젝트 `docs/코드컨벤션.md` 참고
