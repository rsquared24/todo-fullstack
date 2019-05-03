import React, { useState } from "react";
import Styled from "styled-components";


const TodoItem = Styled.div`
  display: flex;
`

const Done = Styled.div`
  flex: 1;
`

const Description = Styled.div`
  flex: 2;
`

export interface TodoItemComponentProps { 
  todo: any
}

export const TodoItemComponent = (props: TodoItemComponentProps) => {

  const [ done, setDone ] = useState(props.todo.done);
  const [ description, setDescription ] = useState(props.todo.description);

  const handleTodoItemChange = (event: any) => {  
    setDone(event.currentTarget.checked);
  }

  return (
    <TodoItem>
      <Done>
        <input 
          type="checkbox" 
          checked={done} 
          onChange={handleTodoItemChange}
        />
      </Done>
      <Description>
        {description} 
      </Description>
    </TodoItem>
  )
}
