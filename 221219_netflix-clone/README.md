# 섹션4. Netflix앱 만들기 시작

## Axios 인스턴스 생성 및 요청 보내기

### Axios란?

> 브라우저, Node.js를 위한 **Promise API**를 활용하는 HTTP 비동기 통신 **라이브러리**

- `npm install axios --save`
- Axios **인스턴스화**를 하자
  - URL의 중복된 부분을 계속 입력하지 않도록
  - 뒷부분의 경로만 입력해주면 편하니깐
  1. 인스턴스를 생성할 **폴더 파일** 생성
     - `src/api/api.js`
     - `src/api/requests.js`

## Nav component - useEffect()

참조 : [Hooks API Reference - React](https://ko.reactjs.org/docs/hooks-reference.html#useeffect)

### useEffect

> 리액트 컴포넌트가 **렌더링**될 때마다 **특정 작업을 실행**할 수 있도록 하는 **Hook**
> 
> `componentDidMount` , `componentDidUpdate` , `componentWillUnmount`

- **기본 형태**
  - `useEffect(function[, deps])`
  - `function`
    - 수행하고자 하는 **작업, effect를 발생하는 함수**
    - 컴포넌트 **렌더링**이 **완료**된 후 수행된다
    - `return`
      - **정리(clean-up) 함**수를 반환
      - **메모리 누수 방지**를 위해 UI에서 컴포넌트를 **제거하기 전**에 수행
  - `deps` : 배열 형태, **검사**하고자 하는 **특정 값**이나 **빈 배열**

### deps의 유무에 따라서…

- deps를 `생략`하면?
  - 컴포넌트가 **리렌더링 될 때마다** 호출된다.
- deps에 특정 값을 넣으면? `[val]`
  - **mount** :  useEffect에 등록한 함수가 호출됨
  - **update** : deps에 넣은 값이 바뀔 때마다 호출됨
  - **unmount** : 호출됨
  - 값이 바뀌기 직전에도 호출
  - useEffect 안에서 사용하는 **state**나 **props**를 **deps에 넣어야 한다**
    - 만약 그러지 않으면! props나 state가 최신 상태가 아니게 된다!
    - 클로저와 관련 있음?
- deps가 빈 배열이면? `[]`
  - **mount** :  useEffect에 등록한 함수가 호출됨, 한 번만 실행
  - **unmount** : cleanup 함수가 호출됨

## Styled Component란

- `CSS-in-JS` 라고 하는 Javascript 파일 안에서 CSS를 처리할 수 있게 해주는 **대표적인 라이브러리**
- `npm install --save styled-component`
- or `yarn add styled-component`