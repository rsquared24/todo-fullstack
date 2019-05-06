import React, { useContext } from "react";
import Axios, { AxiosPromise, AxiosResponse, AxiosError } from "axios";
import { AppContext, AppAction } from "./context";

interface TodoInputComponentProps {
}

export const TodoInputComponent = (props: TodoInputComponentProps) => {
  const [appState, appDispatch] = useContext(AppContext);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let description = e.currentTarget.value;
    if(e.keyCode !== 13 || !description) return;

    insertTodo({ description, done: false });
    e.currentTarget.value = null;
  }
  
  const insertTodo = (todo: any): void => {
    Axios.post("http://localhost:11223/todo", todo).then(
      (response: AxiosResponse) => {
        appDispatch({ type: AppAction.AddTodo, todo: response.data });
      }, 
      (error: AxiosError): void => {
        console.log(error);
      }
    );
  }

  return (
    <input 
      type="text" 
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyDown={handleKeyDown} 
    />
  )
}