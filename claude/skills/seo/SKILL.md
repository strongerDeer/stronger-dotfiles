---
name: seo
description: Next.js 16 메타 태그, Open Graph, JSON-LD 구조화된 데이터 자동 생성. 이커머스 SEO 최적화 (상품, 리뷰, 카테고리)
disable-model-invocation: false
user-invocable: true
---

# SEO 최적화 자동화

Next.js 16 App Router 기반 SEO 최적화를 자동화합니다. 메타 태그, Open Graph, JSON-LD 구조화된 데이터를 자동 생성하고 SEO 점수를 분석합니다.

## 🎯 주요 기능

- **메타 태그 자동 생성**: title, description, keywords
- **Open Graph 최적화**: 소셜 미디어 공유 최적화
- **JSON-LD 구조화된 데이터**: Product, Review, Breadcrumb, Organization
- **SEO 점수 분석**: 누락된 태그 감지
- **이커머스 특화**: 상품, 카테고리, 리뷰 페이지 SEO

## 🚀 사용 방법

```bash
# 기본 메타 태그 생성
/seo app/(main)/products/[productId]/page.tsx

# Open Graph 이미지 포함
/seo app/(main)/products/[productId]/page.tsx --og-image

# JSON-LD 구조화된 데이터 생성
/seo app/(main)/products/[productId]/page.tsx --schema Product

# 전체 SEO 최적화
/seo app/(main)/products/[productId]/page.tsx --all

# SEO 점수 분석
/seo app/(main)/products/[productId]/page.tsx --audit
```

---

## 📋 SEO 검증 항목

### 필수 메타 태그
- [ ] `<title>` - 페이지 제목 (50-60자)
- [ ] `<meta name="description">` - 페이지 설명 (150-160자)
- [ ] `<meta name="keywords">` - 주요 키워드
- [ ] `<link rel="canonical">` - 정규 URL

### Open Graph (소셜 미디어)
- [ ] `og:title` - 공유 제목
- [ ] `og:description` - 공유 설명
- [ ] `og:image` - 공유 이미지 (1200x630)
- [ ] `og:url` - 페이지 URL
- [ ] `og:type` - 페이지 타입 (product, website 등)

### Twitter Card
- [ ] `twitter:card` - 카드 타입 (summary_large_image)
- [ ] `twitter:title` - 트위터 제목
- [ ] `twitter:description` - 트위터 설명
- [ ] `twitter:image` - 트위터 이미지

### 구조화된 데이터 (JSON-LD)
- [ ] Product Schema - 상품 정보
- [ ] Review Schema - 리뷰 정보
- [ ] Breadcrumb Schema - 빵부스러기
- [ ] Organization Schema - 회사 정보
- [ ] AggregateRating Schema - 평점

---

## 🎨 메타 태그 생성 예시

### 상품 상세 페이지 (Product Page)

**생성 결과**:
```typescript
// app/(main)/products/[productId]/page.tsx

import { Metadata } from 'next';

type Props = {
  params: { productId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 상품 정보 조회
  const product = await getProduct(params.productId);

  return {
    title: `${product.name} | Novera Shop`,
    description: product.description.slice(0, 160),
    keywords: [
      product.category,
      product.brand,
      product.name,
      '온라인 쇼핑',
      '무료배송',
    ],

    // Open Graph
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: 'product',
      locale: 'ko_KR',
      siteName: 'Novera Shop',
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },

    // 정규 URL
    alternates: {
      canonical: `https://novera-shop.com/products/${params.productId}`,
    },

    // 추가 메타 태그
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'KRW',
      'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.productId);

  return (
    <>
      {/* JSON-LD 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            image: product.imageUrl,
            description: product.description,
            brand: {
              '@type': 'Brand',
              name: product.brand,
            },
            offers: {
              '@type': 'Offer',
              url: `https://novera-shop.com/products/${params.productId}`,
              priceCurrency: 'KRW',
              price: product.price,
              availability: product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
              seller: {
                '@type': 'Organization',
                name: 'Novera Shop',
              },
            },
            aggregateRating: product.reviewCount > 0 ? {
              '@type': 'AggregateRating',
              ratingValue: product.averageRating,
              reviewCount: product.reviewCount,
            } : undefined,
          }),
        }}
      />

      {/* 페이지 내용 */}
      <div>{/* ... */}</div>
    </>
  );
}
```

---

### 카테고리 페이지 (Category Page)

**생성 결과**:
```typescript
// app/(main)/category/[categoryId]/page.tsx

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(params.categoryId);

  return {
    title: `${category.name} - 베스트 상품 모음 | Novera Shop`,
    description: `${category.name} 카테고리의 인기 상품을 만나보세요. 무료배송, 빠른 배송으로 편리하게 쇼핑하세요.`,
    keywords: [category.name, '온라인 쇼핑', '베스트 상품', '무료배송'],

    openGraph: {
      title: `${category.name} 베스트 상품`,
      description: `${category.name} 카테고리의 인기 상품을 만나보세요.`,
      images: [category.thumbnailUrl],
      type: 'website',
    },

    alternates: {
      canonical: `https://novera-shop.com/category/${params.categoryId}`,
    },
  };
}
```

---

### 리뷰 페이지 (Review Page)

**JSON-LD Review Schema**:
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'Product',
    name: product.name,
    image: product.imageUrl,
  },
  author: {
    '@type': 'Person',
    name: review.authorName,
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.rating,
    bestRating: 5,
    worstRating: 1,
  },
  reviewBody: review.content,
  datePublished: review.createdAt,
}
```

---

## 🔍 SEO 점수 분석

### 사용법
```bash
/seo app/(main)/products/[productId]/page.tsx --audit
```

### 출력 예시
```markdown
# SEO 점수 분석: products/[productId]/page.tsx

## 📊 전체 점수: 75/100

### ✅ 통과 (7/10)
- [x] title 태그 존재 (58자 - 적정)
- [x] description 태그 존재 (152자 - 적정)
- [x] Open Graph 이미지 존재 (1200x630 - 적정)
- [x] 정규 URL 설정
- [x] 구조화된 데이터 (Product Schema)
- [x] 모바일 반응형
- [x] HTTPS 사용

### ⚠️ 개선 필요 (3/10)
1. **keywords 메타 태그 누락**
   - 영향도: Medium
   - 해결책: 상품 카테고리, 브랜드를 keywords에 추가

2. **Twitter Card 누락**
   - 영향도: Medium
   - 해결책: twitter:card, twitter:image 추가

3. **AggregateRating 누락**
   - 영향도: High (검색 결과 별점 표시)
   - 해결책: 리뷰 평점을 JSON-LD에 추가

## 💡 개선 제안

### 1순위 (즉시 수정)
```typescript
// AggregateRating 추가
aggregateRating: {
  '@type': 'AggregateRating',
  ratingValue: 4.5,
  reviewCount: 127,
}
```

### 2순위 (1주 내)
```typescript
// Twitter Card 추가
twitter: {
  card: 'summary_large_image',
  title: product.name,
  description: product.description,
  images: [product.imageUrl],
}
```

### 3순위 (2주 내)
```typescript
// keywords 추가
keywords: [
  product.category,
  product.brand,
  product.name,
  '온라인 쇼핑',
  '무료배송',
]
```

## 🎯 예상 효과
- 검색 노출 증가: +30%
- 클릭률 (CTR) 개선: +15%
- 소셜 미디어 공유 증가: +25%
```

---

## 📝 sitemap.xml 생성

### 사용법
```bash
/seo --sitemap
```

### 생성 결과
```xml
<!-- app/sitemap.ts -->
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://novera-shop.com';

  // 상품 목록 조회
  const products = await getProducts();
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: product.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // 카테고리 목록
  const categories = await getCategories();
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/category/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productUrls,
    ...categoryUrls,
  ];
}
```

---

## 🤖 robots.txt 생성

### 사용법
```bash
/seo --robots
```

### 생성 결과
```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/mypage/',
          '/_next/',
          '/checkout/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/mypage/', '/checkout/'],
      },
    ],
    sitemap: 'https://novera-shop.com/sitemap.xml',
  };
}
```

---

## 🎨 Open Graph 이미지 생성

### 사용법
```bash
/seo app/(main)/products/[productId]/page.tsx --og-image
```

### 생성 결과
```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productName = searchParams.get('name');
  const price = searchParams.get('price');

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom, #E93A86, #FF6B9D)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 'bold', color: 'white' }}>
          {productName}
        </div>
        <div style={{ fontSize: 40, color: 'white', marginTop: '20px' }}>
          {price}원
        </div>
        <div
          style={{
            fontSize: 30,
            color: 'white',
            marginTop: '40px',
            opacity: 0.8,
          }}
        >
          Novera Shop
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

// 사용 예시
// <meta property="og:image" content="/api/og?name=상품명&price=10000" />
```

---

## 📊 이커머스 특화 JSON-LD

### 1. Product Schema (상품)
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: '상품명',
  image: ['이미지1.jpg', '이미지2.jpg'],
  description: '상품 설명',
  sku: 'SKU-123',
  brand: {
    '@type': 'Brand',
    name: '브랜드명',
  },
  offers: {
    '@type': 'Offer',
    url: 'https://novera-shop.com/products/123',
    priceCurrency: 'KRW',
    price: 10000,
    availability: 'https://schema.org/InStock',
    priceValidUntil: '2025-12-31',
    seller: {
      '@type': 'Organization',
      name: 'Novera Shop',
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.5,
    reviewCount: 127,
  },
}
```

### 2. Breadcrumb Schema (빵부스러기)
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: '홈',
      item: 'https://novera-shop.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '카테고리',
      item: 'https://novera-shop.com/category/123',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: '상품명',
      item: 'https://novera-shop.com/products/456',
    },
  ],
}
```

### 3. Organization Schema (회사)
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Novera Shop',
  url: 'https://novera-shop.com',
  logo: 'https://novera-shop.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+82-1234-5678',
    contactType: 'customer service',
    areaServed: 'KR',
    availableLanguage: ['Korean', 'English'],
  },
  sameAs: [
    'https://www.facebook.com/noverashop',
    'https://www.instagram.com/noverashop',
    'https://www.youtube.com/noverashop',
  ],
}
```

---

## 🎯 SEO 성공 지표

### 목표
- **검색 노출**: 주요 키워드 Top 10
- **CTR**: 5% 이상
- **소셜 공유**: 월 100회 이상
- **SEO 점수**: 90/100 이상

### 측정 방법
- Google Search Console
- Google Analytics 4
- Lighthouse SEO 점수
- 소셜 미디어 분석 도구

---

## 💡 SEO 베스트 프랙티스

### 1. 제목 (Title)
- 50-60자 이내
- 주요 키워드 포함
- 브랜드명 후위 배치
- 예: `고품질 가죽 지갑 - 남성용 | Novera Shop`

### 2. 설명 (Description)
- 150-160자 이내
- 핵심 가치 제안
- Call-to-Action 포함
- 예: `프리미엄 이탈리아 가죽으로 제작된 남성 지갑. 무료배송, 30일 무료 반품. 지금 바로 만나보세요!`

### 3. 이미지 최적화
- alt 속성 필수
- WebP 포맷 사용
- 1200x630 (Open Graph)
- Lazy Loading 적용

### 4. URL 구조
- 간결하고 의미 있는 URL
- 소문자 사용
- 하이픈(-) 사용
- 예: `/products/leather-wallet-mens`

---

## 🚀 실전 사용 예시

### 시나리오 1: 신규 상품 페이지 SEO 설정
```bash
# 1단계: 메타 태그 생성
/seo app/(main)/products/[productId]/page.tsx

# 2단계: JSON-LD 추가
/seo app/(main)/products/[productId]/page.tsx --schema Product

# 3단계: Open Graph 이미지 생성
/seo app/(main)/products/[productId]/page.tsx --og-image

# 4단계: SEO 점수 확인
/seo app/(main)/products/[productId]/page.tsx --audit

# 5단계: sitemap 업데이트
/seo --sitemap
```

### 시나리오 2: 전체 SEO 감사
```bash
# 전체 페이지 SEO 점수 분석
/seo --audit-all

# 누락된 메타 태그 리포트
/seo --missing-tags

# 개선 우선순위 리스트
/seo --priority-list
```

---

## 🔗 참고 자료

- Next.js Metadata API: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Schema.org: https://schema.org
- Google Search Console: https://search.google.com/search-console
- Open Graph Protocol: https://ogp.me
- Twitter Cards: https://developer.twitter.com/en/docs/twitter-for-websites/cards
