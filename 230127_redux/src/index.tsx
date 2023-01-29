import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux'
import rootReducer from './reducers/index'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// counter reducer 가져오깅
const store = createStore(rootReducer);
store.dispatch({
  type: 'ADD_TODO',
  text: 'use Redux'
})
console.log(store.getState())

const render = () => root.render(
  <React.StrictMode>
    <App
      // props로 전달하기
      value={store.getState()}
      onIncrement={()=>{store.dispatch({type: 'INCREMENT'})}}
      onDecrement={() => {store.dispatch({type: 'DECREMENT'})}}
    />
  </React.StrictMode>
);
render();
store.subscribe(render)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
