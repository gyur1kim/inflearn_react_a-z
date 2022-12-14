## 리액트는 프레임워크가 아닌 라이브러리

### **프레임워크 vs 라이브러리**

- **프레임워크**
  - 어떠한 앱을 만들기 위해 필요한 대부분의 것을 가지고있음
  - 프레임워크는 앱을 만드는 데 필요한 대부분의 라이브러리를 가지고 있음(=라이브러리를 **포함**한다)
- **라이브러리**
  - 라이브러리는 어떠한 **특정 기능**을 **모듈화** 해놓은 것

### **리액트가 라이브러리인 이유**

- 리액트는 **전적으로 UI를 렌더링하는 데 관여**
- 다른 기능에는 다른 라이브러리를 사용
  - 라우팅 : react-router-dom
  - 상태 관리 : redux, mobx …
  - 빌드 : webpack, npm …
  - 테스팅 : Eslint, Mocha …

## 리액트 컴포넌트

### **컴포넌트**

- 리액트로 만들어진 앱을 이루는 최소한의 단위
- **클래스형 컴포넌트 vs 함수형 컴포넌트**
  - 기존에는 클래스형 컴포넌트를 이용해 개발하는 경우가 대다수
  - 리액트 Hooks 발표 이후 → 함수형 컴포넌트를 이용해 개발하는 경우가 대다

## 브라우저가 그려지는 원리와 가상돔

### **웹 페이지 빌드 과정(CRP, Critical Rendering Path)**

- 웹 브라우저가 HTML 문서를 읽고 스타일을 입히고 뷰포트에 표시하는 과정
  
  1. **DOM tree 생성**
     - 렌더 엔진이 문서를 읽어들임
     - 파싱, 어떤 내용을 페이지에 렌더링 할지 결정
  2. **Render tree 생성**
     - 브라우저가 DOM과 CSSOM을 결합하는 단계
     - 화면에 보이는 모든 콘텐츠와 스타일 정보를 모두 포함하는 최종 렌더링 트리를 출력
     - 화면에 표시되는 모든 노드의 콘텐츠 및 스타일 정보를 포함
  3. **Layout (reflow)**
     - 브라우저가 페이지에 표시되는 각 요소의 크기와 위치를 계산
  4. **Paint**
     - 실제 화면에 그리기

- 어떠한 인터랙션에 의해 **DOM에 변화**가 발생하면, **그 때마다 Render tree** 재생성
  
  ⇒ 작은 변화로 인해 위의 과정을 계속 거치게 되므로 **불필요하게 DOM을 조작**하는 일이 많아지게 됨!

### **가상 돔 (Virtual DOM)**

- 위의 문제를 해결하기 위해 나온 가상 돔
- 실제 DOM을 메모리에 **복사**해둔 것
- 바뀐 데이터가 가상 돔에 렌더링 됨, 이전의 가상 돔과 비교해 **바뀐 부분**을 **찾는다** `(= Diffing)`
- 바뀐 부분만 **실제 DOM에 적용** `(= Reconciliation, 재조정)`

## Create React App을 이용해서 리액트 설치하기

### **기존의 리액트 설치하기**

- Webpack이나 Babel같은 모듈을 설치하고 설정해야 리액트 앱을 시작할 수 있었음…
  - **Webpack**
    - 오픈소스 자바스크립트 모듈 번들러
    - 여러 개로 나누어져 있는 파일들을 하나의 자바스크립트 코드로 압축하고 최적화하는 라이브러
  - **Babel**
    - 최신 자바스크립트 문법을 지원하지 않는 브라우저들을 위해서 최신 자바스크립트 문법을 구형 브라우저에서도 돌 수 있게 변환 시켜주는 라이브러

### **이제는**

- 폴더 생성 - 터미널 실행 - `npx create-react-app ./`
- `npm start`
