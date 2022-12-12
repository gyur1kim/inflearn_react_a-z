import './App.css';
import React, { useState } from 'react';
import List from './components/List'
import Form from './components/Form'

export default function App () {
  // 컴포넌트의 렌더링 결과물에 영향을 주는 데이터를 갖고 있는 객체
  // state = {
  //   todoData: [],
  //   value: "",
  // }

  //state를 useState Hook를 이용해 표현하기
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    }
    setTodoData(prev => [...prev, newTodo])
    setValue("");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div>
        <div>
          <h1>할 일 목록</h1>
        </div>

        {/* props를 이용해 todoData 내리기 */}
        <List todoData={todoData} setTodoData={setTodoData}/>
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit}/>

      </div>
    </div>
  )
}