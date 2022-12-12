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
          <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
            <div className="items-center">
              <input type="checkbox" defaultChecked={data.completed} onChange={() => handleCompletedChange(data.id)} className="mr-2"/>
              <span className={ data.completed? "line-through" : "" }>{data.title}</span>
            </div>
            <div className="items-center">
              <button onClick={()=> handleDelete(data.id)} className="px-4 py-2 float-right">X</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;