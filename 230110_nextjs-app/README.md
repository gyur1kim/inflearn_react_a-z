## Next JS란?

> React의 SSR(Server Side Rendering)을 **쉽게 구현**할 수 있게 도와주는 간단한 **프레임워크**
>

### 기존의 리액트

- **SPA**를 이용하여 **CSR**
- 검색 엔진 최적화(SEO) 부분에 문제가 있음
    - CSR는 빈 html 파일에 화면을 그려내기 때문에 포털 검색에 노출되기 어려움

### Next.js

- **Pre-Rendering**을 통해 페이지를 **미리 렌더링**하여 완성된 HTML을 가져옴
- 사용자와 검색 엔진 크롤러에게 렌더링 된 페이지를 전달할 수 있음

### 설치하기

- `npx create-next-app@latest` / `yarn create next-app`
- `npx create-next-app@latest --typescript` / `yarn create next-app --typescript`

## Next.js 기본 파일 구조

### pages

- 폴더 안에 페이지를 생성
- `index.tsx` : 처음 ‘/’ 페이지
- `_app.tsx` : 공통되는 레이아웃을 작성
    - url을 통해 특정 페이지에 진입하기 전 통과하는 인터셉터 페이지

### public

- 이미지같은 정적 에셋들을 보관

### styles

- 스타일링을 처리해주는 폴더
- `globals.css`
- `module css`
    - 컴포넌트에 종속적으로 스타일링하기 위한 것
    - 확장자 앞에 module을 붙여줌
    - ex) `Home.module.css`

### Next.config.js

- next에 관한 설정