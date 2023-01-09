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
- `npm install --save styled-components`
- or `yarn add styled-components`

# 섹션5. Netflix 앱 완성하기

## scrollLeft, innerWidth

### scrollLeft

- 요소의 **수평 스크롤바 위치**를 나타낸다
- scrollLeft에 값을 **더해**주면 **오른쪽**으로 이동한다
- scrollRight에 값을 **빼**면 **왼쪽**으로 이동한다
- 값을 크게 한다고 해도 최대 스크롤 수평값을 넘길 수 없다

### innerWidth & outerWidth

- `innerWidth`는 창 틀을 뺀 **내용** + **스크롤** 크기
- `outerWidth`는 **브라우저 화면 전체**

## React Router Dom

> **SPA**를 가능하게 하는 라이브러리
>

### SPA란

- **S**ingle **P**age **A**pplication
- `index.html` 파일 하나에 컴포넌트를 그렸다 지웠다 하며 마치 여러 html을 보여주는 효과가 있음

### React Router Dom 설치하기

- `npm install react-router-dom --save`
- or `yarn add react-router-dom`

### React Router 설정하기

1. 앱 어디서나 react router를 사용할 수 있도록 설정
  - `index.js` 파일에 `BrowserRouter` 를 **import**하기
  - 루트 구성 요소 `<App />`를 래핑하기
  - **[참조]** BrowserRouter란?
    - **HTML5 History API**를 이용하여 UI를 URL과 동기화된 상태로 유지해준다
2. 여러 컴포넌트 생성 및 라우트 정의하기

    ```jsx
    <Routes>
    	<Route path='/' element={ <Home/> }/>
    	<Route path='about' elememt={ <About /> }/>
    	<Route path='contact' element={ <Contact /> }/>
    	...
    </Routes>
    ```

   `Routes`

  - 앱에서 생성될 모든 개별 경로에 대한 상위 역할
  - Route들 중 path가 매칭되는 첫번째 Route를 렌더링해줌

   `Route`

  - 단일 경로를 만드는 데 사용됨
  - **path** : 원하는 컴포넌트의 URL 경로 지정 (’/’ 는 메인 화면)
  - **element** : 경로에 맟게 렌더링되어야 하는 컴포넌트를 지정
3. `<Link />` 를 이용해 경로를 이동하기

    ```jsx
    <div>
    	<h1>홈페이지</h1>
    	<Link to="about">About으로 이동</Link>
    	<Link to="contact">Contact로 이동</Link>
    </div>
    ```


## React Router Dom APIs

### 중첩 라우팅 (Nested Routes)

```jsx
<BrowserRouter>
	<Routes>
		
		<Route path='/' element={ <App /> }>                    => 기본으로 렌더링 됨
			<Route index element={ <Home /> } />                  => /

			<Route path='teams' element={ <Teams /> }>            
				<Route path=':teamId' element={ <Team /> } />       => /teams/32
				<Route path='new' element={ <NewTeamForm /> } />    => /teams/new
				<Route index element={ <LeagueStandings /> } />     => /teams
			</Route>
		</Route>

	</Routes>
</BrowserRouter>
```

- path 대신 index값을 넣으면 기본으로 나옴,,

### Outlet

- `import { Outlet } from ‘react-router-dom’`
- 자식 경로 요소를 렌더링하려면 부모 경로 요소에서 `<Outlet />` 를 사용해야 한다.
- **하위 경로**가 렌더링 되는 공간!

### useNavigate

- `import { useNavigate } from ‘react-router-dom’`
- 경로를 바꿔준다

### useParams

- `import { useParams } from ‘react-router-dom’`
- `:` 를 이용하면 URL에 값을 넣을 수 있음, URL의 파라미터를 이용할 수 있음

```jsx
...
<Route path=":teamId" element={ <Team /> } />
...

let params = useParams();
return <h1>이 주소의 파라미터 : {params.teamId}</h1>
```

### useLocation

- `import { useLocation } from ‘react-router-dom’`
- 현재 위치 객체를 반환함
- 현재 위치가 변경될 때마다 일부 side effect를 수행하려는 경우에 유용

### useRoutes

- `import { useRoutes } from ‘react-router-dom’`
- 이 Hooks는 `<Routes>` 와 기능적으로 동일함
  - 하지만 <Route> 요소가 아니라 Javascript 객체를 사용하여 경로를 정의한다
  - 이러한 객체는 JSX가 필요하지 않음

## useLocation을 이용한 검색 기능

- URL의 쿼리스트링에 적힌 값을 가져오는 과정

    ```jsx
    const useQuery = () => {
      return new URLSearchParams(useLocation().search);
    };
    
    let query = useQuery();
    const searchTerm = query.get("q");
    ```

    - **useLocation**
        - 현재 **위치**(location) **객체**를 리턴하는 hook

        ```jsx
        Object {
            hash: ""
            key: "~~~"
            pathname: "/search"
            search: "?q=hello"
            state: null
        }
        ```

    - **URLSearchParams**
      - [URLSearchParams - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
      - URL의 query string로 작업할 유틸리티 메서드를 정의
      - `URLSearchParams` **객체 인스턴스**를 반환
      - `for … of` 를 이용해 순회할 수 있음
      - `URLSearchParams.get()`

        주어진 검색 매개변수와 관련된 첫번째 값을 반환

## useDebounce Custom Hooks 만들기

### Debounce란?

> debounce function은 사용자가 미리 결정된 시간 동안 타이핑을 멈출 때까지 **keyup 이벤트**의 처리를 **지연**시킴
>
- UI코드가 모든 이벤트를 처리할 필요가 없음
- 서버로 전송되는 API 호출 수도 크게 줄어든다

```jsx
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
	
	// 딜레이 시간이 지나면 value를 debounceValue에 설정
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay);
		
		// value가 업데이트 되면 setTimeout 함수를 없앤다. 다시 delay 계산하려고..
    return () => {
      clearTimeout(handler);
    }

  }, [value, delay]);
	
	// 새로 저장된 값 반환
  return debounceValue;
}
```

## 모달창 외부 클릭시 닫히는 Custom hooks

1. 내가 어디를 클릭하는지 알아야 함!(모달창 밖? 안?)
2. 모달 창 바깥을 클릭 시 → Callback 함수를 호출하는 event 등록
3. Callback 함수에서 모달 창 닫기

### 어디를 클릭하나요? - `useRef`

> **특정 DOM**을 선택할 때 사용하는 React Hooks
>
- **JS** : `getElementById` , `querySelector` 같은 DOM Selector 함수를 사용
- **React** : ref를 이용해 DOM 선택
    - 클래스 컴포넌트 : `React.createRef()`
    - 함수형 컴포넌트 : `useRef()`
- DOM을 직접 선택해야 하는 경우
    1. **element 크기**를 가져와야 할 때
    2. **스크롤바 위치**를 가져와야 할 때
    3. element에 **포커스**를 설정해줘야 할 때 등…
- `useRef` 사용법!
    - `useRef()` 를 이용해 **Ref 객체** 만들기
    - 이 객체를 **특정 DOM**의 **ref 값**으로 **설정** `ref={만들어둔 Ref 객체}`
    - Ref 객체의 `.current` 값이 **특정 DOM**을 가리키게 됨

    ```jsx
    //MovieModal.js
    import useOnClickOutside from "../../hooks/useOnClickOutside";
    
    const ref = useRef();
    useOnClickOutside(ref, () => {setModalOpen(false)});
      
    return (
      <div className="presentation">
        <div className="wrapper-modal">
          <div className="modal" ref={ref}>
    			....
    ```

    ```jsx
    //useOnClickOutside.js
    function UseOnClickOutside(ref, handler) {
      useEffect(() => {
        const listener = (e) => {
          console.log(ref.current);
          if(!ref.current || ref.current.contains(e.target)) {
            return;
          }
          handler();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
    
        return () => {
          document.addEventListener("mousedown", listener);
          document.addEventListener("touchstart", listener);
        }
      }, [ref, handler])
    }
    ```