import './App.css';
import React, { useState, useCallback } from 'react';
import Lists from './components/Lists'
import Form from './components/Form'

function App() {
  // console.log('check React.memo : App');

  // 컴포넌트의 렌더링 결과물에 영향을 주는 데이터를 갖고 있는 객체
  // state = {
  //   todoData: [],
  //   value: "",
  // }

  //state를 useState Hook를 이용해 표현하기
  const [todoData, setTodoData] = useState(JSON.parse(localStorage.getItem('todoData')) || []);
  const [value, setValue] = useState("");

  // useCallback을 이용한 함수 최적화
  const handleDelete = useCallback((id) => {
    let newTodoData = todoData.filter(data=> data.id !== id);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }, [todoData]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    }
    setTodoData(prev => [...prev, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue("");
  }

  const handleClearTodos = () => {
    setTodoData([]);
    localStorage.setItem('todoData', []);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleClearTodos}>전체 삭제</button>
        </div>

        {/* props를 이용해 todoData 내리기 */}
        <Lists handleDelete={handleDelete} todoData={todoData} setTodoData={setTodoData}/>
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit}/>

      </div>
    </div>
  );
}

export default App;
