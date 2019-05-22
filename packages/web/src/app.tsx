import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import { AppContext, appReducer } from "./store";
import { HeaderComponent } from "./header.component";
import { MainComponent } from "./main.component";
import { FooterComponent } from "./footer.component";

const App = () => {
  const [ appState, appDispatch ] = useReducer(appReducer, { todos: [], isLoading: false });

  return (
    <AppContext.Provider value={[appState, appDispatch]}>
      <HeaderComponent />
      <MainComponent />
      <FooterComponent />
    </AppContext.Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)