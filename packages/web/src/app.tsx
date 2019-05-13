import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import { AppContext, appReducer, AppAction } from "./store";
import { HeaderComponent } from "./header.component";
import { FooterComponent } from "./footer.component";
import { TodoListComponent } from "./todo-list.component";
import { useGetTodos } from "./api";

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
  const getTodosResponse = useGetTodos();

  useEffect(() => {
    if(!getTodosResponse || getTodosResponse.pending) return;

    if(getTodosResponse.completed && getTodosResponse.data) {
      appDispatch({ type: AppAction.RequestTodosSuccess, response: getTodosResponse.data });
    }
  }, [getTodosResponse]);

  return (
    <AppContext.Provider value={[appState, appDispatch]}>
      <HeaderComponent />
      <section className="main">
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