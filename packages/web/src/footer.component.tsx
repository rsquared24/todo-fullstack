
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

interface FooterComponentProps {
  onFilterClick(filter?: string): void;
}

export const FooterComponent = (props: FooterComponentProps) => {
  const [ appState, appDispatch ] = useContext(AppContext);
  const [ clearCompletedResponse, setIds ] = useClearCompleted();
  const remainingCount = useRemainingCount(appState.todos);
  
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
      <span className="todo-count"> {`${remainingCount} ${remainingCount === 0 ? "item" : "items"} left`} </span>
      <ul className="filters">
        <li> 
          <a href="#" onClick={() => { props.onFilterClick(null) }}> All </a> 
        </li>
        <li> 
        <a href="#/active" onClick={() => { props.onFilterClick("active") }}> Active </a> 
        </li>
        <li>
          <a href="#/completed" onClick={() => { props.onFilterClick("completed") }}> Completed  </a> 
        </li>
      </ul>
      <button className="clear-completed" onClick={handleClearCompletedClick}> Clear completed </button>
    </footer>
  )
}