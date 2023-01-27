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