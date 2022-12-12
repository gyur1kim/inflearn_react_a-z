import React from 'react';

function List({todoData, setTodoData}) {

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
        <div key={data.id}>
          <input type="checkbox" defaultChecked={data.completed} onChange={() => handleCompletedChange(data.id)}/>
          {data.title}
          <button onClick={()=> handleDelete(data.id)}>X</button>
        </div>
      ))}
    </div>
  );
}

export default List;