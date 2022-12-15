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

- 자식 컴포넌트에서 props 객체를 받을 때, `props.property`로 데이터에 접근하는 방식보다는 `객체 구조 분해 할당`으로 받는 것이 코드가 깔끔해진다.

## TailWindCSS

> HTML 안에서, CSS 스타일을 만들 수 있게 해주는 **CSS 프레임워크.** CSS 프레임워크는 더 빠르게 애플리케이션을 스타일링 하는 데 도움을 준다.

1. `npm install -D tailwindcss postcss autoprefixer`
   
   -D는 **개발 환경**에서만 사용하겠다!

2. `npx tailwindcss init`

3. `tailwind.config.js` 에…
   
   ```jsx
   module.exports = {
    content: [
      ".src/**/*.{js, jsx, ts, tsx}"
    ],
    theme: {
      extend: {},
    },
    plugins: [],
   }
   ```

4. `App.css` 에…
   
   ```jsx
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

## drag and drop api

- **설치** : `npm install react-beautiful-dnd --save`

- **import** : `import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";`
  
  - `<DragDropContext />` : drag와 drop을 할 수 있는 영역
  - `<Droppable />` : draggable가 **드랍될 수 있는 영역**, `<Draggable />`을 포함한다
  - `<Draggable />` : **드래그할 수 있는 items**

- `provided` : **스타일 지정** 및 **조회**를 위한 속성이 포함되어 있음

- `snapshot` : 사용자가 요소를 드래그하는 경우 className 속성을 selected로 변경 ← 나중에 **스타일**을 적용하는 데 사용

- `placeholder` : 목록에 **빈 공간**을 만든다

- **적용하기**
  
  - 적용 코드 : [src/components/List.js](https://github.com/gyur1kim/inflearn_react_a-z/blob/master/221212_tailwindcss/src/components/List.js)
  
  - `<Draggable />`
    
    [react-beautiful-dnd/draggable.md at master · atlassian/react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md)
    
    ```jsx
    <Draggable
        // It is important that you add a key prop to each <Draggable />
        // if you are rendering a list of <Draggable />s
        key={data.id}
        draggableId={data.id.toString()}  // string을 사용할 것을 권장
        index={idx}
    >
        // children function, render props
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                // This controls the movement of the draggable when it is dragging and not dragging
                {...provided.draggableProps}
                // DragHandleProps need to be applied to the node that you want to be the drag handle
                {...provided.dragHandleProps}
            >
            </div>
        )}
    </Draggable>
    ```
  
  - `<Droppable />`
    
    [react-beautiful-dnd/droppable.md at master · atlassian/react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md)
    
    ```jsx
    <Droppable droppableId="droppableId">
        // children function
        {(provided[, snapshot]) => (
            <div
                // In order for the droppable to function correctly, you must bind the provided.innerRef to the highest possible DOM node in the ReactElement. 
                // We do this in order to avoid needing to use ReactDOM to look up your DOM node.
                ref={provided.innerRef}
                // an Object that contains properties that need to be applied to a Droppable element
                {...provided.droppableProps}
            >
                <Draggable /> ...
    
                {/* put the placeholder inside of the component for which you have provided the ref */}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
    ```
  
  - `<DragDropContext />`
    
    [react-beautiful-dnd/drag-drop-context.md at master · atlassian/react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/drag-drop-context.md)
    
    ```jsx
    <DragDropContext onDragEnd={handleSomething}>
        <Droppable>
            ...
        </Droppable>
    </DragDropContext>
    ```

## 리액트 불변성 지키기

### 자바스크립트 타입

- **원시 타입(immutable)**
  - `Boolean` , `String` , `Number` , `null` , `undefined` , `Symbol`
  - 참조 및 값을 저장하기 위해 **Call Stack 메모리 공간**을 사용한다
- **참조 타입(mutable)**
  - `Object` , `Array`
  - **Heap**이라는 **별도의 메모리 공간**을 사용
  - Call Stack은 객체 및 배열 값이 아닌 메모리에만 **Heap 메모리 참조 ID**를 **값**으로 **저장**

### 불변성을 지켜야 하는 이유

1. 참조 타입에서 **객체**나 **배열**의 값이 변할 때 **원본 데이터**가 **변경**됨
   
   ⇒ 이 원본 데이터를 **참조**하고 있는 **다른 객체**에서 예상치 못한 **오류**가 발생할 수 있음

2. 리액트에서 화면을 **업데이트** 할 때 값을 **이전 값**과 **비교**
   
   ⇒ **변경된 사항**을 **업데이트** 하기 때문에 불변성을 지켜줘야 함

### 불변성을 지키는 방법

- 참조 타입은 Call Stack은 변하지 않지만 **Heap 메모리 값은 변경**됨!!
- 따라서 아예 **새로운 배열**을 반환하는 메서드를 사용하자
  - `spread operator` , `map` , `filter` , `slice` , `reduce`
- **cf)** 원본 데이터를 변경하는 메서드 : `splice` , `push`

## React.memo를 이용한 컴포넌트 렌더링 최적화

### 현재 Todo 앱의 문제점

- App, Lists, List, Form **컴포넌트**로 나눔 ← 컴포넌트의 **렌더링을 최적화**하기 위함
- ex) Form에 할 일을 타이핑
  - **Form 컴포넌트**와 그 State값을 가진 **App 컴포넌트**만 렌더링 되어야 함
  - 그런데 Lists, List 컴포넌트까지 렌더링이 되고 있어!!!!!!

### 해결 - React.memo

- `React.memo` 적용으로 문제 해결 가능
  
  - 원하는 컴포넌트를 `React.memo` 로 감싼다
  
  ```jsx
  const List = React.memo((...)=>{...})
  export default List
  ```

## useCallback을 이용한 함수 최적화

### 문제점

- 컴포넌트가 re-rendering될 때 그 안의 **함수**도 **다시 만들어진다.**
- 만약 함수가 **자식 컴포넌트**에 **props**로 내려진다면, 컴포넌트가 re-rendering될 때마다 자식 컴포넌트도 함수가 **새롭게 생성**되는 것이므로 **자식 컴포넌트 또한 re-rendering**된다.

### 해결 - useCallback

- `useCallback()` 안에 **콜백함수**와 **의존성 배열**을 순서대로 넣어주면 됨
  - 함수 내에서 참조하는 **state**, **props**가 있다면 **의존성 배열**에 추가해주기
- 의존성 배열이 변하지 않는다면 함수는 새로 생성되지 않음
- 새로 생성되지 않으므로 메모리에 새로 할당되지 않음, **동일 참조값**을 사용
- 의존성 배열에 아무 것도 없다면?
  - 컴포넌트가 최초 렌더링 시에만 함수가 생성
  - 그 이후에는 동일한 참조 값을 사용하는 함수가 된다.

```jsx
import { useCallback } from 'react'

const handleDelete = useCallback((id) => {
    let newTodoData = todoData.filter(data=> data.id !== id);
    setTodoData(newTodoData);
  }, [todoData]);
```
