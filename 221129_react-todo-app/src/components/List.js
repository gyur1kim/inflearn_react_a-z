import React from 'react';

function List({todoData, setTodoData}) {

  const btnStyle = {
    color: "white",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  }

  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed? "line-through" : "none"
    }
  }

  const handleDelete = (id) => {
    let newTodoData = todoData.filter(data=> data.id !== id);
    setTodoData(newTodoData);
  }

  const handleCompletedChange = (id) =>{
    let newTodoData = todoData.map(data => {
      if (data.id === id) {
        data.completed = !data.completed
      }
      return data;
    })
    setTodoData(newTodoData);
  }

  return (
    <div>
      {todoData.map(data=>(
        <div style={getStyle(data.completed)} key={data.id}>
          <input type="checkbox" defaultChecked={data.completed} onChange={() => handleCompletedChange(data.id)}/>
          {data.title}
          <button style={btnStyle} onClick={()=> handleDelete(data.id)}>X</button>
        </div>
      ))}
    </div>
  );
}

export default List;