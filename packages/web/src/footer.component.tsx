
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./context";

const useRemainingCount = (todos: any) => {
  const [ remainingCount, setRemainingCount ] = useState(null);

  useEffect(() => {
    let count = [...todos.filter((todo: any) => !todo.done)].length;
    setRemainingCount(count);
  }, [todos])

  return remainingCount;
}

interface FooterComponentProps {
  onFilterClick(filter?: string): void;
}

export const FooterComponent = (props: FooterComponentProps) => {
  const [ appState, appDispatch ] = useContext(AppContext);
  const remainingCount = useRemainingCount(appState.todos);
  
  if(!appState.todos || appState.todos.length === 0) return null;

  return (
    <footer className="footer">
      <span className="todo-count"> {`${remainingCount} ${remainingCount === 0 ? "items" : "item"} left`} </span>
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
      <button className="clear-completed"> Clear completed </button>
    </footer>
  )
}