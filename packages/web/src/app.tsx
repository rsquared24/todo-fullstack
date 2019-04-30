import React from "react";
import ReactDOM from "react-dom";

import { TodoInputComponent } from "./todo-input.component";

const App = () => {
  return (
    <div>
      <TodoInputComponent />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)