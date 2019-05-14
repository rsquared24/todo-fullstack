import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import { AppContext, appReducer, AppAction } from "./store";
import { HeaderComponent } from "./header.component";
import { FooterComponent } from "./footer.component";
import { TodoListComponent } from "./todo-list.component";
import { useGetTodos, useMarkAsComplete, useMarkAsIncomplete } from "./api";

const useFilteredTodos = (todos: any) => {
  const [ filter, setFilter ] = useState(null);
  const [ filteredTodos, setFilteredTodos ] = useState(null);
  const kvp: any = { "active": false, "completed": true };

  useEffect(() => {
    (kvp[filter] === undefined) ?
      setFilteredTodos(todos) :
      setFilteredTodos([...todos.filter((todo: any) => todo.done === kvp[filter])]);
  }, [todos, filter]);

  return [ filteredTodos, setFilter ];
}

const App = () => {
  const [ appState, appDispatch ] = useReducer(appReducer, { todos: [], isLoading: false });
  const [ filteredTodos, setFilter ] = useFilteredTodos(appState.todos);
  const [ isAllCompleted, setIsAllCompleted ] = useState(!appState.todos.find((x: any) => x.done === false));
  const [ markAsCompleteResponse, setMarkAsCompleteIds ] = useMarkAsComplete();
  const [ markAsIncompleteResponse, setMarkAsIncompleteIds ] = useMarkAsIncomplete();
  const getTodosResponse = useGetTodos();

  useEffect(() => {
    if(!getTodosResponse || getTodosResponse.pending) return;

    if(getTodosResponse.completed && getTodosResponse.data) {
      appDispatch({ type: AppAction.RequestTodosSuccess, response: getTodosResponse.data });
    }
  }, [getTodosResponse]);

  useEffect(() => {
    if(!markAsCompleteResponse || markAsCompleteResponse.pending) return;

    if(markAsCompleteResponse.completed && markAsCompleteResponse.data) {
      appDispatch({ type: AppAction.MarkAsComplete });
    }
  }, [markAsCompleteResponse]);

  useEffect(() => {
    if(!markAsIncompleteResponse || markAsIncompleteResponse.pending) return;

    if(markAsIncompleteResponse.completed && markAsIncompleteResponse.data) {
      appDispatch({ type: AppAction.MarkAsIncomplete });
    }
  }, [markAsIncompleteResponse]);

  const handleToggleAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let checked = e.currentTarget.checked;
    setIsAllCompleted(!checked);
    checked ? 
      setMarkAsCompleteIds(appState.todos.filter((todo: any) => !todo.done).map((todo: any) => todo.id)) :
      setMarkAsIncompleteIds(appState.todos.filter((todo: any) => todo.done).map((todo: any) => todo.id));
  }

  return (
    <AppContext.Provider value={[appState, appDispatch]}>
      <HeaderComponent />
      <section className="main">
        <input 
          id="toggle-all" 
          className="toggle-all" 
          type="checkbox" 
          checked={!isAllCompleted} 
          onChange={handleToggleAllChange} 
        />
        <label htmlFor="toggle-all" />
        <TodoListComponent todos={filteredTodos} />
      </section>
      <FooterComponent onFilterClick={setFilter} />
    </AppContext.Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)