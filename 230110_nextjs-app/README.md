## Next JS란?

> React의 SSR(Server Side Rendering)을 **쉽게 구현**할 수 있게 도와주는 간단한 **프레임워크**

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

## Pre-rendering

> 모든 페이지를 위한 ***HTML을*** Client 사이드에서 자바스크립트로 처리하기 전, ***‘사전에 생성한다’***

- pre render test → **자바스크립트 disable**
  - Chrome DevTools
  - `Ctrl` + `shift` + `P`
  - javascript 검색
  - disable javascript
- react는 CSR 이므로 자바스크립트를 disable하면 화면이 렌더링되지 않음
- next.js는 SSR 이므로 자바스크립트를 disable해도 화면이 렌더링됨

## Data fetching

### getStaticProps

> static generation으로 빌드할 때 데이터를 불러옴(==미리 만들어둠)

- getStaticProps 함수를 **async**로 export하면, getStaticProps에서 리턴되는 **props**를 가지고 페이지를 pre-render한다

- build time에 페이지를 렌더링한다
  
  ```tsx
  function blog({ posts }) {
    return (
      <ul>
        {posts.map((post) => {
          <li>
            {post.title}
          </li>
      })}
      </ul>
    )
  }
  
  export async function getStaticProps() {
    const res = await fetch('https://....')
    const posts = await res.json()
  
    return (
      props: {
        posts,
      }
    )
  }
  ```

- getStaticProps를 사용해야 할 때
  
  - 사용자의 요청보다 먼저 build 시간에 필요한 데이터를 가져올 때
  - Headless CMS에서 데이터를 가져올 때
  - 데이터를 공개적으로 캐시할 수 있을 때
  - 페이지는 미리 렌더링되어야 하고 매우 빨라야할 때

### getStaticPath

> static generation으로 데이터에 기반하여 pre-render시 특정한 동적 라우팅 구현
> ( `pages/post/[id].js` )

- 동적 라우팅이 필요할 때 getStaticPaths로 경로 리스트를 정의
  
  → HTML build time에 렌더링된다

- pre-render에서 정적으로 getStaticPaths에서 호출하는 경로들을 가져온다
  
  ```tsx
  function Post({ post }) {
    //...
  }
  
  export async function getStaticPaths () {
    const res = await fetch('https://...');
    const posts = await res.json();
  
    const paths = posts.map((post) => ({
      params: { id: post.id },
    }))
  
    return { paths, fallback: false }
  }
  
  export async function getStaticProps ({ params }) {
    const res = await fetch(`https://..../${params.id}`);
    const post = await res.json();
  
    return { props: {post} }
  }
  ```

- `fallback`
  
  - `false` : getStaticPaths로 리턴되지 않는 것은 **404 페이지**로 뜬다
  - `true` : getStaticPaths로 리턴되지 않는 것은 **fallback 페이지**로 뜬다

### getServerSideProps

> server side rendering으로 요청이 있을 때 데이터를 불러옴

- getServerSideProps 함수를 async로 export하면, Next는 각 요청마다 리턴되는 데이터를 getServerSideProps로 pre-render한다
  
  ```tsx
  export default functionPage ({ data }) {
    //...
  }
  
  export async function getServerSideProps() {
    const res = await fetch('https://...');
    const data = await res.json();
  
    return { props: { data }}
  }
  ```

- getServerSideProps를 사용해야 할 때
  
  - 요청할 때 데이터를 가져와야 하는 페이지를 미리 렌더해야할 때
  
  - 모든 요청에 대한 결과를 계산, 추가 구성 없이 CDN에 의해 결과를 캐시할 수 없음
    
    ⇒ getStaticProps보다 첫번째 바이트까지의 시간이 느림

## Typescript란

> **javascript + type**

### typescript가 나온 배경

- JavaScript 코드가 커질수록 복잡해짐!
  
  → 코드를 유지 관리하고 재사용하기 어려워짐

- type 검사 및 컴파일 시 오류 검사의 기능을 수용하지 못함

### typescript

- typescript → **typescript complier** → javascript
- **Type System**
  - 개발 환경에서 에러 잡는 것을 도와줌
  - type annotation을 사용해 코드를 분석할 수 있음
  - 오직 개발 환경에서만 활성화됨
  - 타입 스크립트와 성능 향상과는 관계가 없음
  - 타입 스크립트와 성능 향상과는 관계가 없음

## 마크다운 파일을 데이터로 추출하기

### 1. process.cwd()

- **현재 작업 디렉토리**를 반환

- node 명령을 호출한 **작업 디렉토리**의 **절대경로**

- 현재 작업 디렉토리 + posts → 블로그 글이 들어있는 경로 생성
  
  ```tsx
  const postsDirectory = path.join(process.cwd(), 'posts');
  ```

### 2. fs.readdirSync()

- 대상 디렉토리 내의 모든 파일 읽어오기
  
  ```tsx
  const fileNames = fs.readdirSync(postsDirectory);
  // 결과 : [pre-rendering.md, ssg-ssr.md]
  ```

### 3. md file 읽어 객체로 반환하기

- **gray-matter**
  
  - `npm install gray-matter --save`
  
  - md 파일의 내용을 data로 변환할 때 사용하는 모듈
  
  - string을 object로!
    
    ```tsx
    const allPostsData = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf-8');
      const matterResult = matter(fileContents);
    
      return {
        id,
        ...allPostsData(matterResult.data as { date: string; title: string })
      }
    })
    ```

### 4. 날짜를 기준으로 sort하기

- `sort()`
  - 콜백 함수를 이용해 원하는 값을 기준으로 정렬 가능
  - `(a, b) ⇒ {}`

    - 📌 <오름차순 기준>
    
      - return 값이 0보다 작으면 a를 b보다 낮은 인덱스로 정렬(a가 먼저 옴)
        - a가 b보다 작으면 음수를 반환하자
        - `a-b`
      - 0을 반환하면 a와 b를 서로에 대해 변경하지 않음
      - return 값이 0보다 크면, b를 a보다 낮은 인덱스로 정렬(b가 먼저 옴)
        - b가 a보다 작으면 양수를 반환하자
        - `b-a`

## Typescript Type

모든 value는 type을 갖는다.

typescript는javascript에서 기본으로 제공하는 기본 제공 유형을 상속한다.

- **Primitive types**
  - string
  - number
  - boolean
  - null               : 하나의 값을 가진다
  - undefined    : 초기화되지 않은 변수의 기본값
  - symbol         : 고유한 상수값
  - void
- **Object types**
  - function
  - array
  - class
  - object
  
  ```typescript
  // function
  const getNumber = (i: number): void => { console.log(i) }
  
  
  // array
  const arr: string[] = ['a', 'b', 'c']
  
  
  // class
  class Music {}
  let music: Music = new Music()
  
  
  //object
  let point: {x: number, y: number} = {x: 20, y: 10}
  ```