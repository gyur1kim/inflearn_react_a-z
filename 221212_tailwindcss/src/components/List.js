import React, {useState} from 'react';

const List = ({id, title, completed, todoData, setTodoData, handleDelete, provided, snapshot}) => {
  // console.log('check React.memo : List');

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleCompletedChange = (id) => {
    let newTodoData = todoData.map(data => {
      if (data.id === id) {
        data.completed = !data.completed
      }
      return data;
    })
    setTodoData(newTodoData);
  }

  const handleEditTitle = (e) => {
    setEditedTitle(e.target.value);
  }

  const handleSubmitTitle = (e) => {
    e.preventDefault();

    let newTodoData = todoData.map((todo) => {
      if (todo.id === id){
        todo.title = editedTitle;
      }
      return todo;
    })
    setTodoData(newTodoData);
    setIsEditing(false);
  }

  // 수정중일 때와 아닐 때 UI를 다르게 보이게....
  if(isEditing) {
    return(
      <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded bg-gray-100">
        <div className="items-center">
          <form onSubmit={handleSubmitTitle}>
            <input type="text" value={editedTitle} onChange={handleEditTitle} className="w-full px-3 py-2 mr-4 text-gray-500 rounded"/>
          </form>
        </div>
        <div className="items-center">
          <button onClick={() => setIsEditing(false)} className="px-4 py-2 float-right">X</button>
          <button type="submit" onClick={handleSubmitTitle} className="px-4 py-2 float-right">저장</button>
        </div>
      </div>
    )
  }
  else{
    return (

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
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 float-right">수정</button>
          </div>
        </div>

    );
  }
}

export default React.memo(List);