import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import { AppContext, appReducer, AppAction } from "./context";
import { TodoInputComponent } from "./todo-input.component";
import { TodoListComponent } from "./todo-list.component";

const App = () => {
  const [ appState, appDispatch ] = useReducer(appReducer, { todos: null, isLoading: false });
  
  useEffect(() => {
    appDispatch({ type: AppAction.RequestTodos })

    axios.get("http://localhost:11223/todo").then(
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
      <TodoInputComponent />
      <TodoListComponent todos={appState.todos} />
    </AppContext.Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)