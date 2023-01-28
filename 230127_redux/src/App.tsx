import React from 'react';
import './App.css';

// typescript라서 형식 정해주기
type Props = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

function App({value, onIncrement, onDecrement}: Props) {
  return (
    <div className="App">
      Clicked: {value} times
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );
}

export default App;
