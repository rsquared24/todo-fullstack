import React, { useState, useContext, useEffect } from "react";
import { AppContext, AppAction } from "./store";
import { TodoItemComponent } from "./todo-item.component";
import { useGetTodos, useMarkTodos } from "./api";

const useFilteredTodos = () => {
  const [ appState, appDispatch ] = useContext(AppContext);
  const [ filteredTodos, setFilteredTodos ] = useState(null);
  const kvp: any = { "active": false, "completed": true };

  useEffect(() => {
    (kvp[appState.filter] === undefined) ?
      setFilteredTodos(appState.todos) :
      setFilteredTodos([...appState.todos.filter((todo: any) => todo.done === kvp[appState.filter])]);
  }, [appState.todos, appState.filter]);

  return filteredTodos;
}

export const MainComponent = () => {
  const [ appState, appDispatch ] = useContext(AppContext);
  const [ isToggleAll, setIsToggleAll ] = useState(false);
  const [ markTodosResponse, setMarkTodos ] = useMarkTodos(appState.todos);
  const getTodosResponse = useGetTodos();
  const filteredTodos = useFilteredTodos();

  useEffect(() => {
    setIsToggleAll(appState.todos.find((todo: any) => todo.done === false) ? false : true);
  }, [appState.todos]);

  useEffect(() => {
    if(!getTodosResponse || getTodosResponse.pending) return;

    if(getTodosResponse.completed && getTodosResponse.data) { 
      appDispatch({ type: AppAction.RequestTodosSuccess, response: getTodosResponse.data });
    }
  }, [getTodosResponse]);

  useEffect(() => {
    if(!markTodosResponse || markTodosResponse.pending) return;

    if(markTodosResponse.completed && markTodosResponse.data) {
      appDispatch({ type: (isToggleAll ? AppAction.MarkAsComplete : AppAction.MarkAsIncomplete) });
    }
  }, [markTodosResponse] )

  const handleToggleAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let checked = e.currentTarget.checked;
    setIsToggleAll(checked);
    setMarkTodos(checked);
  }
  
  return (
    <section className="main">
      <input 
        id="toggle-all" 
        className="toggle-all" 
        type="checkbox" 
        checked={isToggleAll} 
        onChange={handleToggleAllChange} 
      />
      {(appState.todos && appState.todos.length > 0) &&
        <label htmlFor="toggle-all" />
      }
      {filteredTodos && 
        <ul className="todo-list">
          {filteredTodos.map((value: any) => <TodoItemComponent key={value.id} todo={value} /> )}
        </ul>
      }
    </section>
  )
}