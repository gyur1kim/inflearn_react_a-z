import React, { useState } from 'react';
import "./App.css"

export default function App () {
  // 컴포넌트의 렌더링 결과물에 영향을 주는 데이터를 갖고 있는 객체
  // state = {
  //   todoData: [
  //     {
  //       id: "1",
  //       title: "공부하기",
  //       completed: true,
  //     },
  //     {
  //       id: "2",
  //       title: "청소하기",
  //       completed: false,
  //     },
  //   ],
  //   value: "",
  // }

  //state를 useState Hook를 이용해 표현하기
  const [todoData, setTodoData] = useState([
    {
      id: "1",
      title: "공부하기",
      completed: true,
    },
    {
      id: "2",
      title: "청소하기",
      completed: false,
    },
  ]);

  btnStyle = {
    color: "white",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  }

  getStyle = (completed)=>{
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed? "line-through" : "none"
    }
  }

  handleDelete = (id) => {
    let newTodoData = this.state.todoData.filter(data=> data.id !== id);
    this.setState({todoData: newTodoData});
  }

  handleChange = (e)=>{
    this.setState({value: e.target.value})
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    }
    this.setState({ todoData: [...this.state.todoData, newTodo], value: "" });
  }

  handleCompletedChange = (id) =>{
    let newTodoData = this.state.todoData.map(data => {
      if (data.id === id) {
        data.completed = !data.completed
      }
      return data;
    })

    this.setState({ todoData: newTodoData });
  }

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        {this.state.todoData.map(data=>(
          <div style={this.getStyle(data.completed)} key={data.id}>
            <input type="checkbox" defaultChecked={data.completed} onChange={() => this.handleCompletedChange(data.id)}/>
            {data.title}
            <button style={this.btnStyle} onClick={()=> this.handleDelete(data.id)}>X</button>
          </div>
        ))}

        <form style={{display: 'flex'}} onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="value"
            style={{flex: '10', padding: '5px'}}
            placeholder="해야 할 일을 입력하세요"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="입력"
            className="btn"
            style={{flex: "1"}}
          />
        </form>

      </div>
    </div>
  )
}