---
name: perf
description:
  성능 분석 + Lighthouse 자동화 통합. 번들 사이즈, 이미지 최적화, 코드 스플리팅, Lighthouse CI/CD, 점수 추이 분석, React Query 캐싱
disable-model-invocation: false
user-invocable: true
---

# 성능 프로파일러 & Lighthouse 자동화

웹 페이지의 성능을 분석하고 Lighthouse를 자동으로 실행하여 점수를 개선합니다.

## 🚀 주요 기능

- **코드 분석**: 번들 사이즈, 이미지, 코드 스플리팅 검증
- **Lighthouse 자동 실행**: CLI에서 Lighthouse 자동 실행 및 리포트
- **CI/CD 통합**: 임계값 기반 자동화 테스트
- **점수 추이 분석**: 시간별 Lighthouse 점수 변화 추적
- **상세 리포트**: JSON/HTML 리포트 생성

## 📝 사용 방법

```bash
# 기본 성능 분석 (코드 분석)
/perf app/(main)/products/page.tsx

# Lighthouse 자동 실행
/perf app/(main)/products/page.tsx --lighthouse

# CI/CD 테스트 (임계값 설정)
/perf --lighthouse --ci --threshold 80

# 점수 추이 분석
/perf --trend

# 상세 HTML 리포트 생성
/perf app/(main)/products/page.tsx --lighthouse --report
```

## 🎯 분석 영역

### 1. 번들 사이즈 최적화

- **라이브러리 크기**: 무거운 라이브러리 식별
- **Tree Shaking**: 미사용 코드 제거
- **Dynamic Import**: 코드 스플리팅 기회
- **의존성 분석**: `package.json` 최적화

### 2. 이미지 최적화

- **Next.js Image**: `<img>` → `<Image>` 변환
- **Lazy Loading**: 뷰포트 밖 이미지 지연 로딩
- **이미지 포맷**: WebP, AVIF 사용
- **크기 최적화**: 적절한 width/height 지정

### 3. 코드 스플리팅

- **Dynamic Import**: `next/dynamic` 사용
- **Route-based**: 페이지 단위 분할
- **Component-based**: 무거운 컴포넌트 분할
- **Lazy Loading**: React.lazy, Suspense

### 4. React Query 캐싱

- **staleTime**: 캐시 유효 시간 설정
- **cacheTime**: 캐시 보관 시간
- **refetchOnMount**: 불필요한 재요청 방지
- **Prefetching**: 데이터 미리 가져오기

### 5. Lighthouse 점수 개선

- **Performance**: 로딩 속도, TTI, FCP
- **Accessibility**: 접근성
- **Best Practices**: 보안, 표준 준수
- **SEO**: 메타 태그, 시맨틱 HTML

## 📊 성능 지표 (Core Web Vitals)

### LCP (Largest Contentful Paint)

- **목표**: < 2.5초
- **개선 방법**:
  - 이미지 최적화
  - Server Component 활용
  - 폰트 최적화 (font-display: swap)

### FID (First Input Delay)

- **목표**: < 100ms
- **개선 방법**:
  - JavaScript 번들 최소화
  - 무거운 연산 Web Worker로 이동
  - 이벤트 핸들러 최적화

### CLS (Cumulative Layout Shift)

- **목표**: < 0.1
- **개선 방법**:
  - 이미지 width/height 명시
  - 폰트 깜빡임 방지
  - 동적 컨텐츠 공간 예약

## 🔍 분석 프로세스

### 1단계: 파일 읽기

```
$ARGUMENTS 파일(페이지 또는 컴포넌트)을 읽고 분석합니다.
```

### 2단계: 성능 이슈 식별

- 무거운 라이브러리 import
- 최적화되지 않은 이미지
- 코드 스플리팅 기회
- 불필요한 리렌더링
- 비효율적인 데이터 페칭

### 3단계: 최적화 방안 제시

## 📋 성능 리포트 형식

````markdown
# 성능 분석 리포트: [파일명]

## 📊 예상 성능 점수

- Lighthouse Performance: XX/100
- 번들 사이즈: ~XXX KB
- 최적화 여지: 상/중/하

---

## 🔴 Critical (즉시 수정)

### 1. 이미지 최적화 누락

**위치**: Line XX **문제**: `<img>` 태그 사용, 최적화 안 됨 **영향**: LCP 저하, 대역폭 낭비
**해결책**: \```typescript // ❌ 현재 <img src="/product.jpg" alt="상품" />

// ✅ 개선 import Image from 'next/image'; <Image src="/product.jpg" alt="상품" width={500}
height={500} priority // LCP 이미지인 경우 /> \``` **예상 개선**: LCP 30% 단축

---

## 🟡 Warning (개선 권장)

### 1. 무거운 라이브러리 Dynamic Import

### 2. React Query 캐싱 미흡

---

## 🟢 Good (잘된 부분)

- Next.js Image 컴포넌트 사용
- Server Component 활용

---

## 💡 최적화 로드맵

### 단기 (1-2일)

1. 이미지 최적화
2. Dynamic Import

### 중기 (1주)

3. React Query 캐싱
4. 코드 스플리팅

### 장기 (1개월)

5. 번들 사이즈 감소
6. Edge Runtime 전환
````

## 🎯 실전 최적화 예시

### 예시 1: 이미지 최적화

#### 문제

```typescript
// ❌ 최적화 안 됨
export const ProductCard = ({ image }) => {
  return <img src={image} alt="상품" />;
};
```

#### 해결책

```typescript
// ✅ Next.js Image 사용
import Image from 'next/image';

export const ProductCard = ({ image }) => {
  return (
    <Image
      src={image}
      alt="상품"
      width={300}
      height={300}
      loading="lazy"  // 지연 로딩
      placeholder="blur"  // 블러 효과
    />
  );
};
```

**예상 개선**:

- LCP: 2.5초 → 1.2초 (52% 개선)
- 페이지 로드: 800KB → 200KB (75% 감소)

---

### 예시 2: 코드 스플리팅 (Dynamic Import)

#### 문제

```typescript
// ❌ 무거운 컴포넌트가 항상 로드됨
import Chart from 'react-chartjs-2';

export const Dashboard = () => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      {showChart && <Chart data={data} />}
    </div>
  );
};
```

#### 해결책

```typescript
// ✅ Dynamic Import (필요할 때만 로드)
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-chartjs-2'), {
  loading: () => <div>차트 로딩 중...</div>,
  ssr: false,  // 서버 렌더링 제외
});

export const Dashboard = () => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      {showChart && <Chart data={data} />}
    </div>
  );
};
```

**예상 개선**:

- 초기 번들: 500KB → 300KB (40% 감소)
- TTI: 3초 → 1.8초 (40% 개선)

---

### 예시 3: React Query 캐싱 최적화

#### 문제

```typescript
// ❌ 매번 재요청
export const ProductList = () => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    // staleTime 없음 → 매번 재요청
  });

  return <div>{data?.map(...)}</div>;
};
```

#### 해결책

```typescript
// ✅ 캐싱 전략 적용
export const ProductList = () => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,  // 5분간 fresh
    cacheTime: 10 * 60 * 1000,  // 10분간 보관
    refetchOnMount: false,  // 마운트 시 재요청 안 함
    refetchOnWindowFocus: false,  // 포커스 시 재요청 안 함
  });

  return <div>{data?.map(...)}</div>;
};
```

**예상 개선**:

- API 요청 횟수: 100% → 20% (80% 감소)
- 데이터 로딩 속도: 500ms → 0ms (캐시 히트 시)

---

### 예시 4: 불필요한 리렌더링 방지

#### 문제

```typescript
// ❌ 매 렌더링마다 새 객체/함수 생성
export const ProductList = ({ products }) => {
  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={handleClick}  // 매번 새 함수
        />
      ))}
    </div>
  );
};
```

#### 해결책

```typescript
// ✅ useCallback으로 메모이제이션
import { useCallback } from 'react';

export const ProductList = ({ products }) => {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={handleClick}  // 동일한 참조
        />
      ))}
    </div>
  );
};

// 🎯 더 나은 방법: React.memo로 최적화
const ProductCard = React.memo(({ product, onClick }) => {
  return <div onClick={onClick}>{product.name}</div>;
});
```

**예상 개선**:

- 리렌더링 횟수: 100회 → 10회 (90% 감소)
- CPU 사용률: 30% 감소

---

### 예시 5: 폰트 최적화

#### 문제

```typescript
// ❌ 폰트 로딩 중 텍스트 깜빡임 (FOIT)
import './globals.css';

// globals.css
@import url('https://fonts.googleapis.com/css2?family=Pretendard');
```

#### 해결책

```typescript
// ✅ Next.js Font Optimization
import { Pretendard } from 'next/font/google';

const pretendard = Pretendard({
  subsets: ['latin'],
  display: 'swap',  // 폰트 로딩 중 시스템 폰트 표시
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>{children}</body>
    </html>
  );
}
```

**예상 개선**:

- CLS: 0.25 → 0.05 (80% 개선)
- 폰트 로딩: 2초 → 0.5초 (75% 개선)

---

### 예시 6: Server Component 활용

#### 문제

```typescript
// ❌ 불필요한 Client Component
'use client';

export const ProductList = async () => {
  const products = await fetchProducts();

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
```

#### 해결책

```typescript
// ✅ Server Component (더 빠름, 번들 작음)
export const ProductList = async () => {
  const products = await fetchProducts();  // 서버에서 실행

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
```

**예상 개선**:

- 번들 사이즈: 50KB 감소
- TTI: 0.5초 단축
- SEO: 향상 (서버 렌더링)

## 🚀 사용 예시

```bash
# 페이지 전체 분석
/perf app/(main)/products/page.tsx

# 컴포넌트 분석
/perf app/components/product/card/card.tsx

# API Route 분석
/perf app/api/products/route.ts

# 여러 파일 분석
/perf app/(main)/**/*.tsx
```

## 📈 Lighthouse 점수 목표

| 지표           | 현재 | 목표 | 우선순위 |
| -------------- | ---- | ---- | -------- |
| Performance    | 60   | 90+  | 🔴 높음  |
| Accessibility  | 85   | 95+  | 🟡 중간  |
| Best Practices | 80   | 95+  | 🟡 중간  |
| SEO            | 90   | 100  | 🟢 낮음  |

## 📚 최적화 체크리스트

### 이미지

- [ ] `<Image>` 컴포넌트 사용
- [ ] width/height 명시
- [ ] loading="lazy" 적용
- [ ] priority 설정 (LCP 이미지)
- [ ] WebP/AVIF 포맷

### JavaScript

- [ ] Dynamic Import (무거운 컴포넌트)
- [ ] Tree Shaking (미사용 코드 제거)
- [ ] 번들 사이즈 < 200KB (페이지당)
- [ ] Server Component 우선

### React Query

- [ ] staleTime 설정 (5분)
- [ ] cacheTime 설정 (10분)
- [ ] Prefetching (필요 시)
- [ ] 불필요한 refetch 방지

### 폰트

- [ ] Next.js Font Optimization
- [ ] display: swap
- [ ] 서브셋 사용
- [ ] Preload

### 기타

- [ ] Suspense + Streaming
- [ ] Error Boundary
- [ ] Loading UI
- [ ] Skeleton UI

## 🎯 성능 개선 우선순위

### 1순위 (즉시)

- 이미지 최적화 (LCP 직접 영향)
- 폰트 최적화 (CLS 직접 영향)

### 2순위 (1주 내)

- Dynamic Import (번들 사이즈)
- React Query 캐싱 (API 요청)

### 3순위 (1개월 내)

- Server Component 전환
- Edge Runtime 활용

## 🚨 Lighthouse 자동화 가이드

### Lighthouse CLI 자동 실행

```bash
# 기본 실행 (모바일)
/perf --lighthouse

# 데스크톱 모드
/perf --lighthouse --device=desktop

# 특정 카테고리만
/perf --lighthouse --only-categories=performance,accessibility

# Throttling 설정
/perf --lighthouse --throttling=4g  # 3g, 4g, none
```

### 출력 예시

```
🚀 Lighthouse 분석 중...

✅ Lighthouse 리포트 (모바일)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Performance       🔴 62/100
   - First Contentful Paint: 2.1s
   - Largest Contentful Paint: 3.8s
   - Total Blocking Time: 450ms
   - Cumulative Layout Shift: 0.15

📊 Accessibility     🟢 95/100
📊 Best Practices    🟡 83/100
📊 SEO              🟢 100/100

🔴 Critical Issues:
  1. 이미지 최적화 안 됨 (-12점)
  2. 렌더링 차단 리소스 (-8점)
  3. 미사용 JavaScript (-7점)

💡 권장 사항:
  ✓ Next.js Image 컴포넌트 사용
  ✓ 폰트 preload 적용
  ✓ JavaScript 코드 스플리팅
```

---

## 🔄 CI/CD 통합

### GitHub Actions

`.github/workflows/lighthouse.yml`:

```yaml
name: Lighthouse CI

on:
  pull_request:
    branches: [main, develop]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Start server
        run: npm run start &

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun --config=.lighthouserc.json
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### Lighthouse 설정 파일

`.lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000",
        "http://localhost:3000/products",
        "http://localhost:3000/artists"
      ],
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "throttling": {
          "rttMs": 40,
          "throughputKbps": 10240,
          "cpuSlowdownMultiplier": 1
        }
      }
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.8 }],
        "categories:accessibility": ["warn", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.95 }],

        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 300 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### package.json scripts

```json
{
  "scripts": {
    "lighthouse": "lhci autorun",
    "lighthouse:mobile": "lhci autorun --collect.settings.preset=mobile",
    "lighthouse:desktop": "lhci autorun --collect.settings.preset=desktop",
    "perf:check": "npm run build && npm run lighthouse"
  }
}
```

---

## 📈 점수 추이 분석

### 자동 추적

```bash
# 점수 히스토리 확인
/perf --trend

# 특정 기간
/perf --trend --from=2024-01-01 --to=2024-02-24

# 특정 페이지만
/perf --trend --url=/products
```

### 출력 예시

```
📊 Lighthouse 점수 추이 (최근 30일)

Performance
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2024-01-25  🔴 58  ███████████████░░░░░
2024-02-01  🔴 62  ████████████████░░░░  ↗️ +4
2024-02-08  🟡 68  █████████████████░░░  ↗️ +6
2024-02-15  🟡 75  ██████████████████░░  ↗️ +7
2024-02-24  🟢 82  ████████████████████  ↗️ +7

📈 개선률: +24점 (41% 향상)

주요 개선 사항:
✓ 2024-02-05: Next.js Image 적용 (+8점)
✓ 2024-02-12: Dynamic Import 적용 (+6점)
✓ 2024-02-20: React Query 캐싱 (+5점)
```

### 히스토리 저장

Lighthouse 결과는 `.lighthouse/history/` 폴더에 자동 저장됩니다:

```
.lighthouse/
├── history/
│   ├── 2024-02-24-homepage.json
│   ├── 2024-02-24-products.json
│   └── 2024-02-24-artists.json
├── reports/
│   ├── homepage.html
│   └── products.html
└── trends.json
```

---

## 🎯 임계값 기반 테스트

### CI/CD 자동 테스트

```bash
# 기본 임계값 (80점)
/perf --lighthouse --ci

# 커스텀 임계값
/perf --lighthouse --ci --threshold 85

# 카테고리별 임계값
/perf --lighthouse --ci \
  --performance=80 \
  --accessibility=90 \
  --best-practices=85 \
  --seo=95
```

### 테스트 결과

```bash
# ✅ 성공 시 (exit code 0)
✅ All Lighthouse scores passed!

Performance: 82/100 (threshold: 80) ✓
Accessibility: 95/100 (threshold: 90) ✓
Best Practices: 88/100 (threshold: 85) ✓
SEO: 100/100 (threshold: 95) ✓

# ❌ 실패 시 (exit code 1)
❌ Lighthouse scores below threshold!

Performance: 75/100 (threshold: 80) ✗ (-5)
Accessibility: 95/100 (threshold: 90) ✓
Best Practices: 82/100 (threshold: 85) ✗ (-3)
SEO: 100/100 (threshold: 95) ✓

🔴 Fix required:
  - Performance: 5점 부족
  - Best Practices: 3점 부족
```

---

## 📄 상세 리포트 생성

### HTML 리포트

```bash
# HTML 리포트 생성
/perf app/(main)/products/page.tsx --lighthouse --report

# 리포트 자동 열기
/perf app/(main)/products/page.tsx --lighthouse --report --open
```

생성된 리포트: `.lighthouse/reports/products-2024-02-24.html`

### JSON 리포트

```bash
# JSON 형식으로 저장
/perf --lighthouse --format=json --output=lighthouse-report.json
```

JSON 구조:

```json
{
  "url": "http://localhost:3000/products",
  "timestamp": "2024-02-24T10:30:00.000Z",
  "scores": {
    "performance": 82,
    "accessibility": 95,
    "bestPractices": 88,
    "seo": 100
  },
  "metrics": {
    "firstContentfulPaint": 1200,
    "largestContentfulPaint": 2100,
    "totalBlockingTime": 180,
    "cumulativeLayoutShift": 0.05,
    "speedIndex": 2400
  },
  "audits": {
    "uses-optimized-images": {
      "score": 0.65,
      "numericValue": 450,
      "details": {
        "items": [
          {
            "url": "/images/product.jpg",
            "wastedBytes": 180000
          }
        ]
      }
    }
  }
}
```

---

## 🔥 실전 사용 예시

### 예시 1: PR 전 성능 체크

```bash
# 1. 코드 분석
/perf app/(main)/products/page.tsx

# 2. Lighthouse 실행
/perf app/(main)/products/page.tsx --lighthouse

# 3. 임계값 테스트
/perf --lighthouse --ci --threshold 80

# 4. HTML 리포트 생성 (팀 공유용)
/perf --lighthouse --report
```

### 예시 2: 성능 개선 전후 비교

```bash
# 개선 전
/perf app/(main)/products/page.tsx --lighthouse --tag=before

# 이미지 최적화 적용...

# 개선 후
/perf app/(main)/products/page.tsx --lighthouse --tag=after

# 비교
/perf --compare before after
```

출력:

```
📊 성능 비교: before vs after

Performance
  before:  62/100  ████████████░░░░░░░░
  after:   78/100  ███████████████░░░░░  ↗️ +16 (25% 개선)

LCP (Largest Contentful Paint)
  before:  3.8s
  after:   2.1s  ↗️ -1.7s (44% 개선)

Total Bundle Size
  before:  850KB
  after:   520KB  ↗️ -330KB (38% 감소)

💡 주요 개선:
  ✓ Next.js Image 적용 → LCP 1.7초 단축
  ✓ Dynamic Import → 번들 330KB 감소
  ✓ React Query 캐싱 → API 요청 80% 감소
```

### 예시 3: 전체 사이트 감사

```bash
# 주요 페이지 일괄 분석
/perf --lighthouse --urls=/ \
  /products \
  /artists \
  /category \
  --ci --threshold 80 \
  --report
```

---

## 🎓 Best Practices

### 1. 정기적인 모니터링

```bash
# 매주 월요일 자동 실행 (cron)
0 9 * * 1 cd /path/to/project && /perf --lighthouse --trend
```

### 2. PR별 성능 체크

`.github/workflows/pr-perf-check.yml`:

```yaml
name: PR Performance Check

on: pull_request

jobs:
  perf:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - run: /perf --lighthouse --ci --threshold 80
```

### 3. 성능 예산 설정

`.lighthouserc.json`:

```json
{
  "ci": {
    "assert": {
      "budgets": [
        {
          "resourceSizes": [
            { "resourceType": "image", "budget": 300 },
            { "resourceType": "script", "budget": 200 },
            { "resourceType": "stylesheet", "budget": 50 }
          ]
        }
      ]
    }
  }
}
```

---

## 🔗 참고 자료

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [React Query Performance](https://tanstack.com/query/latest/docs/react/guides/performance)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Lighthouse Scoring Guide](https://web.dev/performance-scoring/)
- [Performance Budgets](https://web.dev/performance-budgets-101/)
