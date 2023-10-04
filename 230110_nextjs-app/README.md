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
  
  - ```tsx
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
  - null                : 하나의 값을 가진다
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

## Typescript 추가 제공 타입

### `Any`

- 잘 알지 못하는 타입을 표현해야 할 때

- 컴파일 시 타입 검사를 하지 않고 통과하기를 바랄 때

- 최대한 사용하지 않기
  
  - tsconfig.json 파일에서 `noImplicitAny` 옵션을 추가하면 `any`타입 사용시 오류 발생

### `Union`

- 둘 이상의 타입을 사용할 수 있음

- ```typescript
  let code: string | number;
  code = 123     // true
  code = "123"   // true
  code = false   // false
  ```

### `Enum`

- 열거형 (Enumerated type)

- 값들의 집합을 명명

- 열거된 각 값은 별도의 값이 설정되지 않은 경우 기본적으로 0부터 시작

- ```typescript
  enum PrintMedia {
      Newspaper,   // 0
      Newsletter,  // 1
      Magazine,    // 2
      Book         // 3
  }
  
  // 위와 아래는 같은 표현임
  // type이 3이면 무슨 타입인지 파악하기 어려움
  // PrintMedia.Book으로 mediaType을 나타내면 파악하기 편리함
  let mediaType: number = 3
  let mediaType: number = PrintMedia.Book  
  
  // 반대로 number를 통해 enum 값의 멤버 이름을 도출할 수 있음
  let type: string = PrintMedia[3]  // "Book"
  ```

- 별도의 값을 설정할 수도 있음
  
  - 값이 할당되지 않은 아이템은 이전 아이템의 값에 +1 된 값이 설정됨
  
  - ```typescript
    enum PrintMedia {
        Newspaper = 1,   // 1
        Newsletter = 50, // 50
        Magazine = 55,   // 55
        Book             // 56 (55+1)
    }
    ```

- 값은 꼭 숫자이진 않습니다
  
  - ```typescript
    enum LanguageCode = {
        korean = "ko",
        english = "en",
        japanese = "jp",
        chinese = "zh",
        spanish = "es"
    }
    
    const languageCode: string = LanguageCode.english  // "en"
    ```

- `enum`과 `object`의 차이점
  
  1. 속성 추가 가능성
     
     - `object`는 코드 내에서 새롭게 속성을 자유롭게 추가할 수 있음
     
     - `enum`은 선언하고난 뒤 새로운 속성을 추가할 수 없음, 변경 불가
  
  2. 속성값 타입
     
     - `object`는 javascript가 허용하는 모든 타입이 올 수 있음
     
     - `enum`의 속성값에는 문자열, 숫자만 허용됨

### `void`

- 데이터가 없는 경우에 사용됨
  
  - 함수가 값을 반환하지 않는 경우

### `never`

- 절대 발생하지 않을 값, 어떤 일이 절대 일어나지 않을 것이라 확신할 때 사용함

- 함수의 리턴 타입
  
  - 항상 오류를 리턴
  
  - 혹은 리턴 값을 절대로 내보내지 않음 (==무한루프)
  
  - ```typescript
    function throwError(errorMsg: string): never {
        throw new Error(errorMsg)
    }
    
    
    function keepProcessing(): never {
        while (true) {
            console.log("infinite loop")
        }
    }
    ```

### `void` vs `never`

- `void` 유형은 **undefined, null** 값을 가질 수 있음
  
  - 실제로 함수에서 return값이 없는 경우, 암묵적으로 undefined를 리턴함
  
  - 따라서 return값이 없는 함수에는 void type을 할당하자.

- `never` 유형은 **어떠한 값도 가질 수 없음**

## type annotation, type inference

### type annotation

> 개발자가 타입을 타입스크립트에게 직접 말해주는 것
> 
> ```typescript
> const rate: number = 5;
> ```

꼭 개발자가 annotation해줘야 하는 경우

1. any 타입을 리턴하는 경우
   
   - 함수가 any를 리턴해버리면... 타입스크립트에서 타입을 추론하기 어려워요

2. 변수 선언을 먼저하고 할당을 나중에하는 경우
   
   - 할당을 하지 않아서 값을 추론하지 못함

3. 변수에 대입될 값의 타입이 일정하지 않은 경우
   
   - 여러 타입이 지정될 때는 `|` 로 여러 타입을 annotation해주자

### type inference

> 타입스크립트가 타입을 추론하는 것
> 
> ```typescript
> const rate = 5;   // 선언과 할당을 동시에 하는 경우 타입을 추론함
> ```

## type assertion

- 타입 표명
  
  - 컴파일러가 추론 및 분석한 타입보다 내가 더 타입을 잘 알고 있어
  
  - typescript가 자체적으로 추론할 수 있는 것보다 변수 유형에 대해 더 잘 이해하고 있을 때

- ```typescript
  interface Foo {
      bar: number,
      bas: string
  }
  
  // 에러 발생
  // 컴파일러는 foo가 속성이 없는 {}라고 추론하기 때문임
  var foo = {}
  foo.bar = 123;
  foo.bas = "123";
  
  var foo = {} as Foo;
  foo.bar = 123;
  foo.bas = "123";
  ```
  
- `as Foo` vs `<Foo>`

  - 타입 표명은 위의 두 가지 방법으로 사용할 수 있음
  
  - 리액트에서는 <Foo> 키워드가 JSX 문법과 겹치므로 `as Foo` 키워드를 사용하자