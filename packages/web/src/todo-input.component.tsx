import React, { Dispatch, useReducer, useContext } from "react";
import axios from "axios";
import { AppContext, AppAction } from "./context";

enum InsertTodoAction {
  Request,
  RequestSuccess,
  RequestFail
}

const insertTodo = (description: string) => (insertTodoDispatch: Dispatch<any>, appDispatch: Dispatch<any>) => {
  if(!description) return;

  insertTodoDispatch({ type: InsertTodoAction.Request });

  axios.post("http://localhost:11223/todo", { description, done: false }).then(
    (response) => {
      insertTodoDispatch({ type: InsertTodoAction.RequestSuccess, data: response.data });
      appDispatch({ type: AppAction.AddTodo, todo: response.data });
    },
    () => {
      insertTodoDispatch({ type: InsertTodoAction.RequestFail })
    }
  );
}

const insertTodoReducer = (state: any, action: any) => {
  switch(action.type) {
    case InsertTodoAction.Request:
      return {
        ...state,
        isSaving: true
      }
    case InsertTodoAction.RequestSuccess:
      return {
        ...state,
        isSaving: false,
        todo: action.data
      };
    case InsertTodoAction.RequestFail:
      return {
        ...state,
        isSaving: false
      }
    default:
      return state;
  }
}

interface TodoInputComponentProps {
}

export const TodoInputComponent = (props: TodoInputComponentProps) => {
  const [insertTodoState, insertTodoDispatch] = useReducer(insertTodoReducer, { todo: null, isSaving: false });
  const [appState, appDispatch] = useContext(AppContext);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if(e.keyCode !== 13 || !value) return;

    insertTodo(value)(insertTodoDispatch, appDispatch);
    e.currentTarget.value = null;
  }

  return (
    <>
      <input 
        type="text" 
        onKeyDown={handleKeyDown} 
      />
    </>
  )
}