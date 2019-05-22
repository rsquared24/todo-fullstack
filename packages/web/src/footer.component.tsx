
import React, { useContext, useEffect, useState } from "react";
import { AppContext, AppAction } from "./store";
import { useClearCompleted } from "./api";

const useRemainingCount = (todos: any) => {
  const [ remainingCount, setRemainingCount ] = useState(null);

  useEffect(() => {
    let count = todos.filter((todo: any) => !todo.done).length;
    setRemainingCount(count);
  }, [todos])

  return remainingCount;
}

const useAnyCompleted = (todos: any) => {
  const [ anyCompleted, setAnyCompleted ] = useState(null);

  useEffect(() => {
    setAnyCompleted(todos.filter((todo: any) => todo.done === true).length >= 1);
  }, [todos])

  return anyCompleted;
}

export const FooterComponent = () => {
  const [ appState, appDispatch ] = useContext(AppContext);
  const [ clearCompletedResponse, setIds ] = useClearCompleted();
  const remainingCount = useRemainingCount(appState.todos);
  const anyCompleted = useAnyCompleted(appState.todos);
  
  useEffect(() => {
    if(!clearCompletedResponse || clearCompletedResponse.pending) return;

    if(clearCompletedResponse.completed && clearCompletedResponse.data) {
      appDispatch({ type: AppAction.ClearComplete });
    }
  }, [clearCompletedResponse]);

  if(!appState.todos || appState.todos.length === 0) return null;

  const handleClearCompletedClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let ids = appState.todos.filter((todo: any) => todo.done === true).map((todo: any) => todo.id);
    setIds(ids);
  }
  
  return (
    <footer className="footer">
      <span className="todo-count"> 
        {`${remainingCount} ${remainingCount === 1 ? "item" : "items"} left`} 
      </span>
      <ul className="filters">
        <li> 
          <a href="#"
             onClick={() => { appDispatch({ type: AppAction.ApplyFilter, filter: null }) }}> 
            All 
          </a> 
        </li>
        <li> 
          <a href="#/active" 
            onClick={() => { appDispatch({ type: AppAction.ApplyFilter, filter: "active" }) }}> 
            Active 
          </a> 
        </li>
        <li>
          <a href="#/completed" 
             onClick={() => { appDispatch({ type: AppAction.ApplyFilter, filter: "completed" }) }}> 
            Completed  
          </a> 
        </li>
      </ul>
      {anyCompleted && 
        <button 
          className="clear-completed" 
          onClick={handleClearCompletedClick}> 
          Clear completed 
        </button>
      }
    </footer>
  )
}