import React from 'react';
import './App.css';

// typescript라서 형식 정해주기
type Props = {
  value: any;
  onIncrement: () => void;
  onDecrement: () => void;
}

function App({value, onIncrement, onDecrement}: Props) {
  return (
    <div className="App">
      Clicked: {value.counter} times
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );
}

export default App;
