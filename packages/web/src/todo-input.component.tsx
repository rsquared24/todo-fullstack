import React, { useReducer } from "react";
import { useAsyncRequest, InsertTodoParams, insertTodoReducer, insertTodoRequest } from "./data";

interface TodoInputComponentProps {
}

export const TodoInputComponent = (props: TodoInputComponentProps) => {
  const [state, dispatch] = useReducer(insertTodoReducer, { todo: null, isSaving: false });
  const insertTodo = useAsyncRequest<InsertTodoParams>(insertTodoRequest, dispatch)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if(e.keyCode !== 13 || !value) return;

    insertTodo({ description: value });
    e.currentTarget.value = null;
  }

  if(state.isSaving) {
    console.log(1);
  }

  return (
    <>
      <input 
        type="text" 
        onKeyDown={handleKeyDown} 
      />
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </>
  )
}