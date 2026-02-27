# Web V2 Boilerplate

React + TypeScript + Vite 기반으로 구성된 스타터 템플릿입니다.  
React Query, Recoil, Styled-Components, React Router, Axios 토큰 갱신 로직 등을 기본 제공해 팀 내 공통 보일러플레이트로 활용할 수 있습니다.

---


## 주요 기술 스택

- React 19, TypeScript 5, Vite 7
- React Router DOM 7 (코드 스플리팅 기반 라우팅)
- @tanstack/react-query 5 (전역 쿼리 설정 + Devtools)
- Recoil 상태 관리 및 persist 키 세팅
- Styled-Components + styled-normalize + 테마 시스템
- Axios 인스턴스 & 토큰 자동 갱신 인터셉터

---

## 사전 준비

- Node.js 20 LTS 이상
- npm 또는 pnpm (본 가이드는 `npm` 명령어 기준)
- `.env` 파일에 API URL, 앱 이름 등 환경 변수 정의

---

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000 자동 오픈)
npm run dev

# 타입 검사 및 빌드
npm run typecheck
npm run build

# 프로덕션 빌드 미리보기
npm run preview
```

---

## 환경 변수 설정

프로젝트 루트에 `.env` 또는 `.env.local` 파일을 생성하고 아래 값을 정의하세요.

```
VITE_APP_NAME=your-app-name
VITE_API_BASE_URL=https://api.example.com
```

- `VITE_APP_NAME` : 토큰 키 및 Recoil persist key 생성에 사용됩니다.
- `VITE_API_BASE_URL` : Axios 인스턴스 기본 URL로, 토큰 리프레시 요청도 이 값을 기준으로 전송됩니다.

필요한 환경 변수는 `import.meta.env`를 통해 접근하며 `src/lib/constants/sharedStrings.tsx`, `src/lib/axios.ts` 등에서 사용 중입니다.

---

## 프로젝트 구조

```
src/
  AppProviders.tsx           # 전역 Provider (Recoil, QueryClient, Theme, Router)
  main.tsx                   # 엔트리 포인트
  lib/
    axios.ts                 # Axios 인스턴스 + 토큰 리프레시 인터셉터
    queryClient.ts           # React Query 기본 옵션
    constants/
      queryConfig.ts         # 쿼리 프리셋 (default/dashboard/realtime 등)
      refreshInterval.ts
      sharedStrings.tsx      # 토큰/퍼시스트 키 네이밍 규칙
    core/routes/
      Routes.tsx             # Lazy 로딩 라우트 테이블
      ProtectedRoute.tsx     # 토큰 기반 접근 제어 HOC
    functions/
      authFunctions.ts       # 토큰 CRUD 및 로그아웃 헬퍼
  pages/
    HomePage.tsx             # Protected Route 예시 페이지
    auth/LoginPage.tsx       # 임시 로그인 로직 샘플
    404/NotFoundPage.tsx
  store/exampleAtom.ts       # Recoil atom 샘플
  styles/
    GlobalStyle.ts           # styled-normalize + 글로벌 스타일
    theme.ts                 # 공통 테마 (colors, spacing 등)
    styled.d.ts              # theme 타입 선언
```

---

## 핵심 모듈 가이드

- **AppProviders**  
  RecoilRoot, QueryClientProvider, ThemeProvider, BrowserRouter를 한 번에 감싸 전역 상태와 스타일을 세팅합니다. 신규 Provider 추가 시 이 파일을 수정하세요.

- **라우팅 (`src/lib/core/routes`)**  
  `Routes.tsx`에서 lazy import와 `useRoutes`를 사용해 라우트를 선언합니다. 인증이 필요한 페이지는 `ProtectedRoute`로 감싸 토큰 여부를 확인합니다.

- **인증/토큰 관리 (`src/lib/functions/authFunctions.ts`)**  
  로그인 토큰을 저장·조회·삭제하고 로그아웃 시 Recoil persist 데이터를 함께 초기화합니다. 실제 API 연동 시 이 헬퍼를 확장하세요.

- **Axios 인프라 (`src/lib/axios.ts`)**  
  요청마다 Access Token을 헤더에 주입하고, 401 응답 시 Refresh Token으로 자동 재발급 후 재시도합니다. 공통 에러 처리나 헤더 정책이 필요하면 이 파일에서 확장합니다.

- **React Query 설정 (`src/lib/constants/queryConfig.ts`)**  
  `getQueryConfig('dashboard')`처럼 호출 용도에 맞는 프리셋을 선택할 수 있어 API 호출 정책을 일관되게 유지할 수 있습니다.

- **스타일 시스템 (`src/styles`)**  
  `theme.ts`에 정의된 색상과 간격 유틸을 기반으로 styled-components에서 `theme` prop을 활용하세요.

---

## Depth별 사이드 메뉴 추가 방법

사이드 메뉴는 **flat 메뉴 목록**을 트리로 변환한 뒤, **권한**으로 필터링해 렌더링합니다. 1·2·3 뎁스 모두 같은 방식으로 추가할 수 있습니다.

### 데이터 흐름

1. **`src/lib/data/menuListDummy.ts`** — flat 메뉴 목록 (depth, parentId로 계층 표현)
2. **`src/lib/utils/buildMenuTree.tsx`** — flat → 트리 변환 (`parentId` 기준, `sortRef` 정렬)
3. **`src/lib/data/permissionDummy.ts`** — 메뉴별 권한 (`pmsMenuName`이 메뉴 `title`과 일치해야 노출)
4. **`Sidemenu`** — `buildMenuTree(menuListDummy)` 후 `filterMenuByPermission` 적용 → **SidemenuList**에 전달
5. **SidemenuList / SidemenuItem** — 트리 구조를 재귀적으로 렌더링 (하위가 있으면 `SidemenuList` 다시 사용)

### 메뉴 항목 타입 (`MenuType`)

| 필드 | 설명 |
|------|------|
| `oid` | 고유 ID (문자열). 2·3뎁스의 `parentId`로 참조됨 |
| `title` | 화면에 보이는 메뉴명. **권한 필터는 `pmsMenuName === title`로 비교** |
| `icon` | 아이콘 키 (예: `"IconMenu02"`). `buildMenuTree`의 `iconMap`에 등록된 키만 사용 가능 |
| `depth` | 뎁스 (1: 최상위, 2: 하위, 3: 그 하위) |
| `parentId` | 부모 메뉴의 `oid`. 최상위는 `"0"` (ROOT_ID) |
| `path` | 라우트 경로 (예: `"/key/list"`) |
| `sortRef` | 정렬용 숫자. 작을수록 위에 노출 |

### 1뎁스 메뉴 추가

1. **menuListDummy.ts**에 항목 추가:

```ts
{
  oid: "menu-1-원하는키",
  title: "메뉴 표시명",
  icon: "IconMenu02",  // buildMenuTree.tsx의 iconMap에 있는 키
  depth: 1,
  parentId: "0",
  path: "/원하는경로",
  sortRef: 50,
},
```

2. **permissionDummy.ts**에 권한 추가 (같은 `title`을 `pmsMenuName`으로):

```ts
{
  pmsId: "고유숫자",
  pmsGroup: "User",
  pmsMenuName: "메뉴 표시명",  // menuListDummy의 title과 동일
  pmsMenuActive: 1,
  // ... 나머지 필드
},
```

3. **라우트**는 `Routes.tsx`에, **페이지**는 별도 컴포넌트로 추가합니다.

### 2뎁스 메뉴 추가

1. **menuListDummy.ts**에 1뎁스 항목의 `oid`를 `parentId`로 지정:

```ts
{
  oid: "menu-2-하위키",
  title: "하위 메뉴명",
  icon: "IconMenu05",
  depth: 2,
  parentId: "menu-1-key",  // 부모 1뎁스의 oid
  path: "/key/list",
  sortRef: 21,
},
```

2. **permissionDummy.ts**에 `pmsMenuName: "하위 메뉴명"` 항목 추가.

3. 해당 `path`에 대한 라우트·페이지를 추가합니다.

### 3뎁스 메뉴 추가

1. **menuListDummy.ts**에 2뎁스 항목의 `oid`를 `parentId`로 지정:

```ts
{
  oid: "menu-3-세부키",
  title: "3뎁스 메뉴명",
  icon: "IconMenu06",
  depth: 3,
  parentId: "menu-2-key-list",  // 부모 2뎁스의 oid
  path: "/key/list/detail",
  sortRef: 211,
},
```

2. **permissionDummy.ts**에 `pmsMenuName: "3뎁스 메뉴명"` 항목 추가.

3. **buildMenuTree.tsx**에서 새 아이콘을 쓰는 경우 `iconMap`에 키를 추가하고, 해당 SVG를 import합니다.

### 주의사항

- **메뉴 노출 조건**: `permissionDummy`에 `pmsMenuName`이 메뉴 `title`과 **완전 일치**하는 항목이 있고 `pmsMenuActive === 1`일 때만 표시됩니다.
- **아이콘**: 사용할 수 있는 키는 `buildMenuTree.tsx`의 `iconMap`에 정의된 것뿐입니다. 새 아이콘은 SVG import 후 `iconMap`에 추가해야 합니다.
- **정렬**: 같은 부모 아래에서는 `sortRef` 오름차순으로 정렬됩니다. 1뎁스끼리, 2뎁스끼리 구간을 나누어 번호를 주면 관리하기 쉽습니다 (예: 1뎁 10·20·30, 2뎁 21·22·23).

---

## 개발 스크립트

- `npm run dev` : Vite 개발 서버 (기본 포트 3000)
- `npm run build` : 타입 검사 후 프로덕션 번들 생성 (`dist/`)
- `npm run preview` : 빌드 결과 미리보기 서버
- `npm run typecheck` : TypeScript 프로젝트 전역 타입 검사
- `npm run lint` : ESLint 검사

---

## 시작 가이드 요약

1. 이 레포지토리를 템플릿으로 사용하거나 클론합니다.
2. `.env`를 작성해 앱 이름과 API 서버 주소를 설정합니다.
3. `npm install` 후 `npm run dev`로 개발을 시작합니다.
4. 라우트, 페이지, 상태 관리를 도메인에 맞게 확장합니다.
5. Axios 요청 유틸과 React Query 프리셋을 통해 API 연동 로직을 통일합니다.

이 템플릿을 바탕으로 공통 레이아웃, 디자인 시스템, 에러 바운더리 등의 인프라를 추가해 팀 표준 보일러플레이트를 완성해보세요. 즐거운 개발 되세요! 🚀
