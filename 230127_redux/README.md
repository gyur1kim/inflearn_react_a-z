## 리덕스란?

### props vs state

- props
    - **properties**의 줄임말
    - props는 구성 요소가 **서로 통신**하는 방법
    - 상위 구성요소 → 하위 구성요소
- state
    - component 내부에서 데이터를 전달하는 방식
    - state is mutable

### redux data flow

![redux_data_flow](https://user-images.githubusercontent.com/96561861/215114140-9d4b3b50-caa1-4ebf-a2fe-e37a639607f8.png)

- 컴포넌트에서 state 변경 요청(dispatch)
- **Action 객체**
    - 간단한 javascript **객체**
    - 우리가 수행하는 **작업의 유형**을 지정하는 **type 속성**이 있음
    - redux 저장소에 일부 데이터를 보내는 데 사용되는 **payload 속성**을 가질 수도 있 다.
- **reducer** 함수 실행
    - 애플리케이션 상태의 **변경 사항을 결정(type)**하고 **업데이트된 상태를 반환**하는 함수
    - 인수로 조치를 취하고 store 내부의 상태를 업데이트

        ```tsx
        (previousState, action) => nextState
        ```

- redux store 업데이트
    - 애플리케이션의 **전체 상태 트리**를 보유한다.
    - **내부 상태를 변경**하는 **유일한 방법**은 해당 상태에 대한 **Action 전달**하기!
    - 클래스가 아닌 몇 가지 Methods가 있는 **객체**일 뿐!
- 변화한 state를 가진 컴포넌트들 리렌더링

## 미들웨어 없이 리덕스 카운터 앱 만들기

- `npx create-react-app redux-app --template typescript`
- `npm install redux --save`

---

- `src/reducers` 폴더 생성, index 파일 만들기
  - index에 reducer 함수 작성, export 해야 사용할 수 있다!
- `최상단 index 파일`에서
  - redux 모듈에서 `createStore` 가져오기
  - reducers 폴더에 생성했던 reducer 함수 가져오기

    `import counter from ‘./reducers/index`

  - `const store = createStore(counter)`
  - 이 과정을 거치면 store에 counter reducer를 등록시키게 된다.

      ```tsx
      import { createStore } from 'redux'
      import counter from './reducers/index'
      ...
      const store = createStore(counter);
      ```

- `getState()`
  - 애플리케이션의 현재 상태 트리를 반환함 == 스토어의 리듀서가 반환한 마지막 값

      ```tsx
      <App
        value={store.getState()}
        onIncrement={()=>{store.dispatch({type: 'INCREMENT'})}}
        onDecrement={() => {store.dispatch({type: 'DECREMENT'})}}
      />
      ```

- `subscribe()`
  - change listner를 추가한다.
  - getState()를 호출하여 **콜백 내부의 현재 상태 트리**를 읽을 수 있다.
  - 작업이 **전달**될 때마다 호출되며 상태 트리의 일부가 잠재적으로 변경되었을 수 있다.

      ```tsx
      const render = () => root.render(
        <React.StrictMode>
          <App
            value={store.getState()}
            onIncrement={()=>{store.dispatch({type: 'INCREMENT'})}}
            onDecrement={() => {store.dispatch({type: 'DECREMENT'})}}
          />
        </React.StrictMode>
      );
      render();
      store.subscribe(render)
      ```

## Combine Reducers

- 리듀서는 하나만 존재( `Root Reducer` )하고, 그 안에 여러 개의 리듀서( `sub Reducer` )를 가질 것!
- root reducer를 만들 때 사용하는 것이 `CombineReducers`

```tsx
// src/reducers/index

import {combineReducers} from "redux";
import counter from './counter';
import todos from './todos'

const rootReducer = combineReducers({
  counter,
  todos
})

export default rootReducer;
```