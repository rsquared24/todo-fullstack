import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { AppContext, appReducer, AppAction } from "./context";
import { TodoInputComponent } from "./todo-input.component";
import { TodoListComponent } from "./todo-list.component";

const App = () => {
  const [ appState, appDispatch ] = useReducer(appReducer, { todos: null, isLoading: false });
  
  useEffect(() => {
    appDispatch({ type: AppAction.RequestTodos })

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
      <header className="header">
        <h1> todos </h1>
        <TodoInputComponent />
      </header>
      <section className="main">
        <TodoListComponent todos={appState.todos} />
      </section>
    </AppContext.Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)