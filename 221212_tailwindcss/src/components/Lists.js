import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List"

const Lists = React.memo( ({todoData, setTodoData, handleDelete}) => {
  // console.log('check React.memo : Lists');

  const handleEnd = (result) => {
    // result에는 source와 destination에 대한 정보가 들어있다. 드래그 이벤트에 대한 정보
    // console.log(result)
    const {destination: {index: destIdx}, source: {index: sourceIdx}} = result;
    if (destIdx !== sourceIdx) {
      // 배열을 직접 복사하면 안됨, 같은 주소를 바라보게 됨
      // const tmpTodoData = todoData;
      const tmpTodoData = [...todoData];
      let sourceTodoItem = tmpTodoData.splice(sourceIdx, 1);
      // 여기서 spread 연산자를 쓴 이유는?
      // splice의 return값은 배열임, 근데 todoItem은 배열 안의 객체거든...
      // 우리는 객체를 쓰고 싶으니까 spread 연산자를 이용해 배열 안의 객체를 꺼내는 것임.
      tmpTodoData.splice(destIdx, 0, ...sourceTodoItem);
      setTodoData(tmpTodoData);
    }

  }

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>

              {todoData.map((data, idx)=>(
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={idx}
                >
                  {(provided, snapshot) => (
                    <List
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      handleDelete={handleDelete}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}

              {/* placeholder가 없으면 drag할 때 기존 자리가 사라지게 되어 어색함 */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
})

export default Lists;