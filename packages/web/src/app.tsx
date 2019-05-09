import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { AppContext, appReducer, AppAction } from "./context";
import { HeaderComponent } from "./header.component";
import { FooterComponent } from "./footer.component";
import { TodoListComponent } from "./todo-list.component";

const useFilteredTodos = (todos: any, filter: string) => {
  const [ filteredTodos, setFilteredTodos ] = useState(null);
  const kvp: any = { "active": false, "completed": true };

  useEffect(() => {
    // filter the todos
    (kvp[filter] === undefined) ?
      setFilteredTodos(todos) :
      setFilteredTodos([...todos.filter((todo: any) => todo.done === kvp[filter])]);
  }, [todos, filter]);

  return filteredTodos;
}

const App = () => {
  const [ appState, appDispatch ] = useReducer(appReducer, { todos: [], isLoading: false });
  const [ filter, setFilter ] = useState(null);
  const filteredTodos = useFilteredTodos(appState.todos, filter);

  useEffect(() => {
    appDispatch({ type: AppAction.RequestTodos });
    Axios.get("http://localhost:11223/todo").then(
      (response) => {
        appDispatch({ type: AppAction.RequestTodosSuccess, response: response.data })
      },
      () => {
        appDispatch({ type: AppAction.RequestTodosFail })
      }
    )
  }, []);

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