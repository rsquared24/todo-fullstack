import React, { useContext, useEffect } from "react";
import { AppContext, AppAction } from "./store";
import { useSaveTodo } from "./api";

interface HeaderComponentProps {
}

export const HeaderComponent = (props: HeaderComponentProps) => {
  const [ appState, appDispatch ] = useContext(AppContext);
  const [ saveTodoResponse, setTodo ] = useSaveTodo();

  useEffect(() => { 
    if(!saveTodoResponse || saveTodoResponse.pending) return;

    if(saveTodoResponse.completed && saveTodoResponse.data) {
      appDispatch({ type: AppAction.AddTodo, todo: saveTodoResponse.data });
    }
  }, [saveTodoResponse])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let description = e.currentTarget.value;
    if(e.keyCode !== 13 || !description) return;

    setTodo({ description, done: false });
    e.currentTarget.value = null;
  }

  return (
    <header className="header">
      <h1> todos </h1>
      <input 
        type="text" 
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={handleKeyDown} 
      />
    </header>
  )
}