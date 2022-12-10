# 섹션2. 간단한 To-Do 앱 만들며 리액트 익히기

## create-react-app으로 실행된 리액트의 기본 구조 살펴보기

### **이름을 수정하면 안되는 것!**

- `public/index.html`
- `src/index.js`

### **src 폴더**

- 대부분의 **리액트 소스 코드**들(js, css)은 이 곳에 작성하면 된다.
- Webpack은 **여기에 있는 파일만** 봄 → 다른 곳은 Webpack에 의해 처리되지 않음

### **package.json**

- 해당 프로젝트에 대한 정보들
  - `name` - 프로젝트 이름
  - `version` - 버전
- `dependencies` - 필요한 **라이브러리**와 라이브러리의 버전
- `scripts` - 앱을 시작할 때, 앱을 빌드할 때, 테스트할 때 사용할 **스크립트**들
- `eslintConfig` - **문법**이나 코드 포맷을 체크해주는 것에 대한 설정

## 할 일 목록 앱 소개 및 JSX 알아보기

### **JSX(javascript syntax extension)**

- 자바스크립트의 확장 문법
- **자바스크립트**와 **HTML 구조**를 **같이 사용**할 수 있기 때문에 기본 UI에 데이터가 변하는 것들이나 이벤트들이 처리되는 부분을 더욱 쉽게 구현할 수 있음

### **JSX를 사용하지 않는다면?**

1. `React.createElement` API를 통해 element를 생성
   
   ex) `const myElement = React.createElement('h1', {}, 'not using JSX');`

2. InMemory에 저장

3. `ReactDOM.render` 함수를 사용해 실제 웹브라우저에 그림
   
   ex) `ReactDOM.render(myElement, document.getElementById('root');`

### **JSX는 createElement를 쉽게 사용하기 위해 사용**

- babel을 이용하면 JSX를 자동으로 createElement로 바꿔줌
- 반드시 **부모 요소 하나**로 자식들을 감싸줘야 한다

## 클래스형 컴포넌트를 이용해 To-Do app 만들기

### **import 할 때 중괄호 유무의 차이는?**

- 참조 : [모듈 내보내고 가져오기](https://ko.javascript.info/import-export)

- **export**의 종류
  
  - **named export**
    - 일반적인 export
    - 복수의 함수가 있는 라이브러리 형태의 모듈에서 사용(함수, 클래스 등..)
    - 모듈을 가져올 때 `{중괄호}` 필요함
    - 내보냈을 때 사용한 이름 그대로 가져옴
  - **default export**
    - 기본 내보내기
    - 모듈 내부에 **개체가 하나만 선언**되어 있다는 사실을 명확히 나타낼 때 사용
    - 모듈을 가져올 때 **중괄호 없어도 됨**
    - 파일당 하나만 있으므로 이 개체를 가져오려는 모듈에서는 중괄호 없이도 어떤 개체를 가져올 지 정확히 알 수 있으므로 이름이 없어도 됨(익명함수 가능)

### **JSX Key 속성 이해하기**

- 요소의 리스트를 나열할 때는 Key를 넣어줘야 한다. 왜??
- React가 **변경**, **추가** 또는 **제거된 항목**을 **식별**하는 데 도움이 됨
- 리액트는 가상 돔을 이용해 바뀐 부분만 실제 돔에 적용함
- 이 바뀐 부분을 인식할 때 **key를 사용**!

### **ReactState**

- 컴포넌트의 **렌더링 결과물**에 **영향**을 주는 **데이터**를 갖고 있는 **객체**

- 리액트에서 데이터가 변할 때 화면을 다시 렌더링 해주기 위해선 **React State**를 사용해야 한다

- `state = {}`

- 데이터를 변경할 때는 **직접 접근하지 말 것**! `setState()`
  
  `this.setState({ 데이터 속성: 변경할 데이터 값 })`

# 섹션3. To-Do 앱 최적화하기

## React Hooks란 무엇인가

> class 없이 state를 사용할 수 있는 새로운 기능

### React Hooks가 필요한 이유

1. **Class Component**와 **Functional Component**의 **비교**
   - Class Component는 Functional Component에 비해 **코드**가 **길고**, **복잡**하며, 성능이 **더딤**
   - 하지만 **리액트의 생명 주기**를 함수형 컴포넌트에서는 사용할 수 없었음
     - 컴포넌트 생성 : `Mount` : (componentWillMount - render - **componentDidMount**)
     - 컴포넌트 업데이트 : `Update` : (shouldComponentUpdate - componentWillUpdate - render - **componentDidUpdate**)
     - 컴포넌트 제거 : `Unmount` : (**componentWillUnmount)**
2. React 16.8 **Hooks** **업데이트**
   - 함수형 컴포넌트에서도 리액트의 생명 주기를 사용할 수 있게 됨!
   - 클래스형 컴포넌트에서는 생명주기를 이용할 때 `componentDidMount` , `componentDidUpdate` , `componentWillUnmount` 각각 다르게 처리해야 함
   - 함수형 컴포넌트는 `useEffect` 하나로 다 처리할 수 있음
3. **HOC 컴포넌트**를 **Custom React Hooks**로 대체할 수 있음
   - **HOC : Higher Order Component**
     - 컴포넌트를 인자로 받아서 새로운 리액트 컴포넌트를 리턴하는 함수
     - 화면에서 재사용 가능한 로직만을 분리해 Component로 만들고, 재사용 불가능한 부분들은 parameter로 받아서 처리하는 방법
   - React Hooks에서는 따로 **Custom Hooks**를 이용해 **Wrapper가 많아지는 일을 방지**
4. 소스코드가 **간결**해짐

## 클래스 컴포넌트에서 함수 컴포넌트로 바꾸기

1. `export default function App() {}`
2. 클래스형 컴포넌트에서는 `render() { }` 안에 `return()` → 함수형 컴포넌트에서는 바로 `return()`
3. state를 **useState Hook**를 이용해서 표현
   - react에서 useState를 import한다
   - `const [getter, setter] = useState('initial value')`
   - **setter** 함수 **파라미터**의 **첫 번째 값**은 **직전 state**의 값임
     - 기존 값을 어떻게 업데이트 할 지에 대한 함수를 등록

## State vs Props

### State

- **해당 컴포넌트 내부**에서 사용하는 데이터
- state는 **변경 가능**함(`setter 함수`)
- state가 변하면 **re-rendering**된다.

### Props

- properties의 줄임말
- 상속하는 **부모 컴포넌트**로부터 **자녀 컴포넌트에 데이터를 전달**하는 방법
- 자식에서 props를 변경해도 변하지 않음 ⇒ props는 **읽기 전용**
- 부모 컴포넌트에서 state를 변경해야 함

## 컴포넌트 분리하기

- `src/components` 폴더 생성
- 컴포넌트로 사용할 js파일 생성하기
- 함수형 컴포넌트의 **shortcut** : `rsf`

## 구조 분해 할당(Destructuring)

- 배열이나 객체의 **속성을 해체**하여 그 값을 **개별 변수**에 담을 수 있게 하는 JavaScript **표현식**
- *clean code*를 위해서!!!
- 객체 구조 분해 할당 - `{}`
- 배열 구조 분해 할당 - `[]`
- 자세한 공부 내용 : [221210_구조분해할당.js](https://github.com/gyur1kim/inflearn_react_a-z/blob/master/221129_react-todo-app/studying/221210_%EA%B5%AC%EC%A1%B0%EB%B6%84%ED%95%B4%ED%95%A0%EB%8B%B9.js)
