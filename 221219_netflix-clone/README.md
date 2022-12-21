# 섹션4. Netflix앱 만들기 시작

## Axios 인스턴스 생성 및 요청 보내기

### Axios란?

> 브라우저, Node.js를 위한 **Promise API**를 활용하는 HTTP 비동기 통신 **라이브러리**
>
- `npm install axios --save`
- Axios **인스턴스화**를 하자
    - URL의 중복된 부분을 계속 입력하지 않도록
    - 뒷부분의 경로만 입력해주면 편하니깐
    1. 인스턴스를 생성할 **폴더 파일** 생성
        - `src/api/api.js`
        - `src/api/requests.js`

## Nav component - useEffect()

### useEffect

> 리액트 컴포넌트가 **렌더링**될 때마다 **특정 작업을 실행**할 수 있도록 하는 **Hook**
>
>
> `componentDidMount` , `componentDidUpdate` , `componentWillUnmount`
>
- **기본 형태**
    - `useEffect(function[, deps])`
    - `function` : 수행하고자 하는 **작업**
    - `deps` : 배열 형태, **검사**하고자 하는 **특정 값**이나 **빈 배열**
- **mount** 됐을 때
    - 컴포넌트가 **처음 렌더링**될 때 **한 번**만 실행하고 싶다면 **빈 배열**
    - **리렌더링**될 때마다 **함수**를 **실행**하고 싶다면 **deps 생략**
- **update** 될 때 (특정 props, state가 바뀔 때)
    - **특정 값**이 **업데이트**될 때 함수를 실행하고 싶다면 **deps 배열**에 검사하고 싶은 값을 넣어준다.
- **unmount** 될 때, **update** 되기 직전에
    - `cleanup` 함수 - **return 뒤**에 나오는 함수(=**뒷정리 함수**)
    - unmount 될 때만 cleanup 함수 실행
        - deps에 빈 배열 넣기
    - 특정 값이 업데이트 되기 직전에 cleanup 함수를 실행
        - deps 배열 안에 검사하고 싶은 값을 넣어준다.