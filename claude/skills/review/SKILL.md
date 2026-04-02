---
name: review
description:
  시니어 개발자 관점에서 코드의 성능, 보안, 가독성, 아키텍처를 종합적으로 리뷰합니다. OWASP Top 10 보안 취약점 자동 검사, 의존성 보안, 민감 정보 노출 탐지. Clean Architecture + React 19/Next.js 16 베스트 프랙티스
disable-model-invocation: false
user-invocable: true
---

# 시니어 코드 리뷰어

작성한 코드를 시니어 개발자의 관점에서 종합적으로 검토합니다.

## 📝 사용 방법

```bash
/review app/components/ProductCard.tsx                  # 전체 리뷰
/review app/api/users/route.ts --security               # 보안 집중 리뷰
/review app/(main)/products/page.tsx --focus performance  # 성능 집중
/review --deps                                          # 의존성 보안 검사
/review --security-scan app/                            # 전체 보안 스캔
```

## 🎯 리뷰 범위

### 1. 성능 최적화 (Performance)

- **불필요한 리렌더링**: `React.memo`, `useMemo`, `useCallback` 누락
- **번들 사이즈**: Dynamic Import, Code Splitting 기회
- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **데이터 페칭**: React Query 캐싱 전략, Waterfall 패턴
- **리소스 로딩**: Lazy Loading, Prefetching

### 2. 보안 (Security) 🔒

#### OWASP Top 10 자동 검사

**A01: Broken Access Control (접근 제어 취약점)**
- 인증/인가 로직 누락
- 권한 체크 우회 가능성
- IDOR (Insecure Direct Object Reference)
- 파일 업로드/다운로드 권한

**A02: Cryptographic Failures (암호화 실패)**
- 평문 비밀번호 저장
- 약한 해싱 알고리즘 (MD5, SHA1)
- HTTPS 미사용
- 민감 데이터 암호화 누락

**A03: Injection (인젝션)**
- SQL Injection (ORM 안전 사용 여부)
- NoSQL Injection
- Command Injection
- XSS (Cross-Site Scripting)

**A04: Insecure Design (안전하지 않은 설계)**
- 비즈니스 로직 취약점
- Rate Limiting 부재
- 입력 검증 누락
- 에러 메시지 정보 노출

**A05: Security Misconfiguration (보안 구성 오류)**
- 디버그 모드 프로덕션 배포
- 기본 계정/비밀번호 사용
- 불필요한 기능 활성화
- CORS 잘못된 설정

**A06: Vulnerable Components (취약한 컴포넌트)**
- 오래된 npm 패키지
- 알려진 보안 취약점 (npm audit)
- 불필요한 의존성
- 라이선스 이슈

**A07: Authentication Failures (인증 실패)**
- 세션 관리 취약점
- 약한 비밀번호 정책
- 다중 인증 미구현
- 토큰 만료 처리 누락

**A08: Data Integrity Failures (데이터 무결성 실패)**
- 서명되지 않은 데이터
- 검증되지 않은 외부 입력
- 안전하지 않은 역직렬화

**A09: Security Logging Failures (로깅/모니터링 실패)**
- 보안 이벤트 미기록
- 민감 정보 로그 노출
- 로그 조작 가능성

**A10: Server-Side Request Forgery (SSRF)**
- 검증되지 않은 URL 요청
- 내부 네트워크 접근 가능성

#### 자동 검증 항목

- **환경 변수 노출**: `.env` 파일 하드코딩, API 키 노출
- **민감 정보 패턴**:
  - API 키: `AIza`, `sk-`, `pk_live_`
  - AWS 키: `AKIA`, `AWS_SECRET`
  - JWT 토큰: `eyJ`
  - 비밀번호: `password`, `passwd`
  - Private Key: `-----BEGIN`
- **의존성 보안**: `npm audit` 결과 분석
- **보안 헤더**: CSP, X-Frame-Options, HSTS
- **CSRF 토큰**: Form, API 요청
- **입력 검증**: Zod, Yup 스키마 사용

### 3. 가독성 & 유지보수성 (Maintainability)

- **코드 복잡도**: 함수가 너무 긴 경우 (50줄 이상)
- **중복 코드**: DRY 원칙 위반
- **매직 넘버**: 상수로 추출 필요
- **네이밍**: 명확한 변수/함수명
- **주석**: 불필요한 주석, 부족한 주석

### 4. 아키텍처 (Architecture)

- **관심사 분리**: UI-비즈니스 로직 분리 (api/ui 폴더)
- **의존성 방향**: 상위 레이어가 하위 레이어 의존
- **컴포넌트 크기**: 단일 책임 원칙 (SRP)
- **Props Drilling**: Context 또는 상태 관리 필요
- **에러 처리**: Error Boundary, Try-Catch

### 5. React 19 & Next.js 16 베스트 프랙티스

- **Server Component 우선**: 불필요한 'use client' 사용
- **Async Server Component**: await 사용 최적화
- **React Compiler**: 최적화 가능한 패턴
- **Suspense**: 데이터 페칭 경계 설정
- **Streaming**: Loading UI 활용

## 📋 리뷰 프로세스

### 1단계: 코드 읽기

```
$ARGUMENTS 파일을 읽고 전체 구조를 파악합니다.
```

### 2단계: 5가지 영역 검토

- 성능
- 보안
- 가독성
- 아키텍처
- 베스트 프랙티스

### 3단계: 리뷰 리포트 작성

## 📊 리뷰 리포트 형식

````markdown
# 코드 리뷰: [파일명]

## 📌 전체 평가

- 성능: 🟢🟡🔴 (상/중/하)
- 보안: 🟢🟡🔴
- 가독성: 🟢🟡🔴
- 아키텍처: 🟢🟡🔴
- 전체 점수: X/10

---

## 🔴 Critical (필수 수정)

### 1. [이슈 제목]

**위치**: Line XX **문제**: [구체적인 문제 설명] **영향**: [보안 취약점, 성능 저하 등] **해결책**:
\```typescript // ❌ 현재 [현재 코드]

// ✅ 개선 [개선된 코드] \```

---

## 🟡 Warning (개선 권장)

### 1. [이슈 제목]

**위치**: Line XX **문제**: [문제 설명] **해결책**: [간단한 설명]

---

## 🟢 Good (잘된 부분)

- TypeScript 타입 안전성 확보
- 에러 핸들링 잘 구현됨
- ...

---

## 💡 리팩토링 제안

### 제안 1: 컴포넌트 분리

[상세 설명 + 코드 예시]

### 제안 2: Custom Hook 추출

[상세 설명 + 코드 예시]

---

## 📚 참고 자료

- [React 19 공식 문서](링크)
- [Clean Architecture 패턴](링크)
````

## 🔍 실제 리뷰 예시

### 예시 1: 성능 이슈

**문제**: 불필요한 리렌더링

```typescript
// ❌ 현재 (매 렌더링마다 새 객체 생성)
export const ProductCard = ({ id, name, price }) => {
  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <Card onClick={handleClick}>
      <h3>{name}</h3>
      <p>{price}원</p>
    </Card>
  );
};
```

**해결책**:

```typescript
// ✅ 개선 (useCallback으로 메모이제이션)
export const ProductCard = ({ id, name, price }) => {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // 의존성 없음

  return (
    <Card onClick={handleClick}>
      <h3>{name}</h3>
      <p>{price}원</p>
    </Card>
  );
};

// 🎯 더 나은 방법: 인라인 핸들러 제거
export const ProductCard = ({ id, name, price, onClick }) => {
  return (
    <Card onClick={() => onClick(id)}>
      <h3>{name}</h3>
      <p>{price}원</p>
    </Card>
  );
};
```

### 예시 2: 보안 이슈

**문제**: XSS 취약점

```typescript
// ❌ 위험
export const Comment = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};
```

**해결책**:

```typescript
// ✅ 안전
import DOMPurify from 'dompurify';

export const Comment = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

// 🎯 더 나은 방법: Markdown 라이브러리 사용
import ReactMarkdown from 'react-markdown';

export const Comment = ({ content }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>;
};
```

### 예시 3: 아키텍처 이슈

**문제**: UI-로직 혼재

```typescript
// ❌ 나쁜 예: 347줄의 거대한 컴포넌트
export const ProductCard = ({ id, name, price }) => {
  // 100줄의 비즈니스 로직
  const handleBookmark = async () => { ... };
  const handleCart = async () => { ... };
  const checkAuth = () => { ... };

  // 200줄의 JSX
  return <div>...</div>;
};
```

**해결책**:

```typescript
// ✅ 좋은 예: 로직 분리
// features/product/api/useProductCard.ts
export const useProductCard = (id: string) => {
  const handleBookmark = async () => { ... };
  const handleCart = async () => { ... };
  const checkAuth = () => { ... };

  return { handleBookmark, handleCart, checkAuth };
};

// features/product/ui/ProductCard.tsx
export const ProductCard = ({ id, name, price }) => {
  const { handleBookmark, handleCart } = useProductCard(id);

  return (
    <Card>
      <h3>{name}</h3>
      <p>{price}원</p>
      <Button onClick={handleBookmark}>찜</Button>
      <Button onClick={handleCart}>장바구니</Button>
    </Card>
  );
};
```

### 예시 4: Next.js 16 최적화

**문제**: 불필요한 Client Component

```typescript
// ❌ 현재
'use client';

export const ProductList = async () => {
  const products = await fetchProducts();
  return <div>{products.map(...)}</div>;
};
```

**해결책**:

```typescript
// ✅ 개선: Server Component로 변경
export const ProductList = async () => {
  const products = await fetchProducts(); // 서버에서 실행
  return <div>{products.map(...)}</div>;
};

// 상호작용 필요한 부분만 Client Component
'use client';
export const ProductCard = ({ id, name }) => {
  const [liked, setLiked] = useState(false);
  return <Card onClick={() => setLiked(!liked)}>...</Card>;
};
```

## 🎯 리뷰 체크리스트

### 성능

- [ ] 불필요한 리렌더링 (React DevTools Profiler)
- [ ] 무거운 연산 메모이제이션 (useMemo)
- [ ] 이벤트 핸들러 메모이제이션 (useCallback)
- [ ] 리스트 가상화 (react-window, react-virtuoso)
- [ ] 이미지 최적화 (Next.js Image, lazy loading)
- [ ] 번들 사이즈 (Dynamic Import)
- [ ] 불필요한 의존성 (package.json)

### 보안

- [ ] 인증/인가 체크
- [ ] XSS 방지 (dangerouslySetInnerHTML)
- [ ] SQL Injection 방지 (ORM 사용)
- [ ] API 키 노출 (환경변수 사용)
- [ ] CSRF 토큰
- [ ] target="\_blank" rel 속성

### 가독성

- [ ] 함수 길이 (50줄 이하)
- [ ] 중첩 깊이 (3단계 이하)
- [ ] 네이밍 (명확성)
- [ ] 주석 (필요한 곳만)
- [ ] 매직 넘버 (상수화)

### 아키텍처

- [ ] 관심사 분리 (UI/로직)
- [ ] 단일 책임 원칙 (SRP)
- [ ] 의존성 방향 (하향)
- [ ] Props Drilling (Context 필요 여부)
- [ ] Error Boundary

### React 19 & Next.js 16

- [ ] Server Component 우선
- [ ] Suspense 활용
- [ ] Streaming (loading.tsx)
- [ ] React Compiler 최적화 가능 패턴
- [ ] 'use client' 최소화

## 🚀 사용 예시

```bash
# 전체 리뷰
/review app/components/product/card/card.tsx

# 특정 영역만 리뷰
/review app/components/product/card/card.tsx --focus performance

# 아키텍처 관점 리뷰
/review app/(main)/products/page.tsx --focus architecture

# 보안 점검
/review app/api/users/route.ts --focus security
```

## 💡 리뷰 원칙

1. **비판적이지만 건설적으로**: 문제만 지적하지 말고 해결책 제시
2. **우선순위 명확히**: Critical → Warning → Suggestion
3. **코드 예시 제공**: "이렇게 하세요"가 아니라 실제 코드 제시
4. **학습 자료 링크**: 공식 문서, 베스트 프랙티스 아티클
5. **칭찬도 함께**: 잘된 부분도 언급하여 동기부여

---

## 🔒 보안 검증 자동화

### 의존성 보안 검사

```bash
# npm 패키지 취약점 검사
/review --deps

# 출력 예시
🔍 의존성 보안 검사 중...

❌ Critical Vulnerabilities: 2
⚠️  High: 5
⚠️  Moderate: 12
✓  Low: 3

🔴 Critical Issues:
1. react-scripts@4.0.3
   - Severity: Critical
   - Vulnerability: Prototype Pollution
   - CVE: CVE-2023-12345
   - Fix: npm install react-scripts@5.0.1

2. axios@0.21.1
   - Severity: Critical
   - Vulnerability: SSRF
   - CVE: CVE-2023-67890
   - Fix: npm install axios@1.6.0

💡 권장 조치:
  npm audit fix
  npm audit fix --force  # Breaking changes 주의
```

---

### 민감 정보 노출 스캔

```bash
# 전체 프로젝트 스캔
/review --security-scan

# 특정 폴더만
/review --security-scan app/api/
```

**출력 예시**:

```
🔍 민감 정보 스캔 중...

🔴 Critical: 3개 발견

1. API 키 하드코딩 발견
   파일: app/api/payment/route.ts:12
   패턴: sk_live_xxxxxxxxxx
   위험도: 🔴 Critical
   조치: 환경 변수로 이동 필요

2. AWS Secret Key 노출
   파일: lib/s3-upload.ts:8
   패턴: AWS_SECRET_ACCESS_KEY
   위험도: 🔴 Critical
   조치: .env 파일 사용 + .gitignore 추가

3. Database URL 하드코딩
   파일: lib/db.ts:5
   패턴: postgresql://user:password@host
   위험도: 🔴 Critical
   조치: 환경 변수 사용

⚠️  Warning: 5개 발견

1. Console.log에 민감 정보
   파일: app/api/users/route.ts:42
   내용: console.log('User password:', password)
   조치: 프로덕션에서 제거

💡 권장 사항:
  ✓ .env 파일 사용 (NEXT_PUBLIC_ 접두사 주의)
  ✓ .env를 .gitignore에 추가
  ✓ GitHub Secrets 사용 (CI/CD)
  ✓ 환경 변수 검증 (Zod)
```

---

### 보안 집중 리뷰

```bash
# API Route 보안 리뷰
/review app/api/users/route.ts --security
```

**검증 항목**:

```markdown
# 보안 리뷰: app/api/users/route.ts

## 🔒 보안 검증 결과

### ✅ 통과한 항목

- 인증 미들웨어 사용
- 입력 검증 (Zod 스키마)
- SQL Injection 방어 (Prisma ORM)
- CORS 설정 적절

### 🔴 Critical Issues

#### 1. 권한 체크 누락 (IDOR 취약점)

**위치**: Line 42-45
**문제**: 사용자 ID만으로 데이터 접근 허용

```typescript
// ❌ 현재 (다른 사용자 데이터 접근 가능)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const user = await db.user.findUnique({
    where: { id: userId }
  });

  return Response.json(user);
}
```

**해결책**:

```typescript
// ✅ 개선 (세션 사용자와 요청 대상 일치 확인)
export async function GET(request: Request) {
  const session = await getSession(request);
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  // 권한 체크: 자기 자신 또는 관리자만
  if (session.userId !== userId && !session.isAdmin) {
    return Response.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  const user = await db.user.findUnique({
    where: { id: userId }
  });

  return Response.json(user);
}
```

#### 2. Rate Limiting 부재

**위치**: 전체
**문제**: 무제한 요청 가능 (Brute Force 공격 가능)

**해결책**:

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function checkRateLimit(identifier: string) {
  const { success } = await ratelimit.limit(identifier);
  return success;
}

// app/api/users/route.ts
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';

  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  // ... 나머지 로직
}
```

### ⚠️  Warnings

#### 1. 에러 메시지 정보 노출

**위치**: Line 78
**문제**: 상세한 에러 메시지로 시스템 정보 노출

```typescript
// ❌ 현재
catch (error) {
  return Response.json(
    { error: error.message }, // DB 구조 노출 가능
    { status: 500 }
  );
}

// ✅ 개선
catch (error) {
  console.error('[API Error]', error); // 서버 로그만
  return Response.json(
    { error: 'Internal server error' }, // 일반적인 메시지
    { status: 500 }
  );
}
```

### 💡 추가 권장 사항

1. **보안 헤더 추가** (`next.config.js`):

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};
```

2. **환경 변수 검증** (`lib/env.ts`):

```typescript
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
});

export const env = envSchema.parse(process.env);
```

3. **입력 검증 강화**:

```typescript
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(2).max(50),
});

export async function POST(request: Request) {
  const body = await request.json();

  // 검증 실패 시 자동으로 에러
  const validated = createUserSchema.parse(body);

  // ... 검증된 데이터 사용
}
```
```

---

### 실전 보안 체크리스트

```bash
# PR 전 보안 체크
/review app/api/**/*.ts --security
/review --deps
/review --security-scan
```

**필수 확인 항목**:

- [ ] 인증/인가 로직 구현
- [ ] 입력 검증 (Zod, Yup)
- [ ] Rate Limiting 적용
- [ ] 환경 변수 사용 (하드코딩 금지)
- [ ] 보안 헤더 설정
- [ ] HTTPS 사용
- [ ] CORS 적절히 설정
- [ ] SQL Injection 방어 (ORM 사용)
- [ ] XSS 방어 (DOMPurify)
- [ ] CSRF 토큰
- [ ] 민감 정보 로깅 금지
- [ ] 의존성 최신 버전 유지
- [ ] npm audit 정기 실행

---

## 🔥 실전 보안 시나리오

### 시나리오 1: 결제 API 보안 리뷰

```bash
/review app/api/payment/checkout/route.ts --security
```

**주요 체크 포인트**:
- Stripe API 키 환경 변수 사용
- Amount 변조 방지 (서버에서 재계산)
- Webhook 서명 검증
- 중복 결제 방지 (Idempotency Key)
- Rate Limiting (결제 API)

### 시나리오 2: 파일 업로드 보안 리뷰

```bash
/review app/api/upload/route.ts --security
```

**주요 체크 포인트**:
- 파일 타입 검증 (MIME type)
- 파일 크기 제한
- 파일명 sanitization
- 경로 탐색 공격 방어 (Path Traversal)
- 바이러스 스캔 (ClamAV)
- S3 권한 설정 (Public/Private)

### 시나리오 3: 인증 로직 보안 리뷰

```bash
/review app/api/auth/[...nextauth]/route.ts --security
```

**주요 체크 포인트**:
- 비밀번호 해싱 (bcrypt, Argon2)
- 세션 만료 시간
- Refresh Token 보안
- 로그인 실패 제한
- 2FA 구현 여부

---

## 📊 보안 리포트 예시

```markdown
# 보안 리뷰 종합 리포트

## 📈 보안 점수: 72/100 🟡

### 점수 상세
- 인증/인가: 85/100 🟢
- 입력 검증: 65/100 🟡
- 데이터 보호: 70/100 🟡
- 의존성 보안: 60/100 🟡
- 설정 보안: 80/100 🟢

### 🔴 Critical (3개) - 즉시 수정 필요
1. API 키 하드코딩 (app/api/payment/route.ts:12)
2. IDOR 취약점 (app/api/users/[id]/route.ts:28)
3. SQL Injection 가능성 (lib/raw-query.ts:45)

### ⚠️  High (7개) - 1주 내 수정
1. Rate Limiting 부재 (모든 API Routes)
2. 입력 검증 누락 (app/api/products/route.ts)
3. 약한 비밀번호 정책
...

### 💡 Medium (12개) - 2주 내 개선
...

### ✅ 잘된 부분
- NextAuth.js 사용으로 인증 표준화
- Supabase RLS로 데이터베이스 레벨 보안
- TypeScript로 타입 안전성 확보
```

---

## 📚 참고 자료

- [React 19 공식 문서](https://react.dev)
- [Next.js 16 공식 문서](https://nextjs.org/docs)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [OWASP Top 10 2021](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Web.dev Security](https://web.dev/secure/)
- [npm Security Best Practices](https://docs.npmjs.com/about-security-best-practices)
- [Snyk Vulnerability Database](https://security.snyk.io/)
