import React, {useState} from 'react';

const List = ({id, title, completed, todoData, setTodoData, handleDelete, provided, snapshot}) => {
  // console.log('check React.memo : List');

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleChangeCompleted = (id) => {
    let newTodoData = todoData.map(data => {
      if (data.id === id) {
        data.completed = !data.completed
      }
      return data;
    })
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData))
  }

  const handleEditTitle = (e) => {
    setEditedTitle(e.target.value);
  }

  // 강의에는 없는데, 수정하다가 나가버리면 수정하던 title이 editedTitle에 저장된다
  // 그래서 재수정 하려고 하면 아까 수정하던 title이 뜬다..
  // 그래서 수정을 시작할 때 title 값을 editedTitle에 넣어야하지 않나 싶어서...
  const handleStartEditing = () => {
    setEditedTitle(title);
    setIsEditing(prev => !prev);
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
    localStorage.setItem('todoData', JSON.stringify(newTodoData))
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
          <button onClick={handleStartEditing} className="px-4 py-2 float-right">X</button>
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
            <input type="checkbox" defaultChecked={completed} onChange={() => handleChangeCompleted(id)} className="mr-2"/>
            <span className={ completed? "line-through" : "" }>{title}</span>
          </div>
          <div className="items-center">
            <button onClick={()=> handleDelete(id)} className="px-4 py-2 float-right">X</button>
            <button onClick={handleStartEditing} className="px-4 py-2 float-right">수정</button>
          </div>
        </div>
    );
  }
}

export default React.memo(List);