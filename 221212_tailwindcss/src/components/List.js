import React from 'react';

const List = React.memo(({id, title, completed, todoData, setTodoData, handleDelete, provided, snapshot}) => {
  // console.log('check React.memo : List');

  const handleCompletedChange = (id) => {
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
      <div
        // key={data.id}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded ${snapshot.isDragging? "bg-gray-200" : "bg-gray-100"}`}
      >
        <div className="items-center">
          <input type="checkbox" defaultChecked={completed} onChange={() => handleCompletedChange(id)} className="mr-2"/>
          <span className={ completed? "line-through" : "" }>{title}</span>
        </div>
        <div className="items-center">
          <button onClick={()=> handleDelete(id)} className="px-4 py-2 float-right">X</button>
        </div>
      </div>
    </div>
  );
})

export default List;