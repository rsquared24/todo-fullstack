import React, { Dispatch, useState, useReducer, useEffect } from "react";
import axios from "axios";

export interface MyComponentProps {
  description?: string
}

interface State {
  todos: Array<any>
}

interface Action {
  type: string,
  data: any
}

const reducer = (state: State, action: Action): State => {
  switch(action.type) {
    case "add": {
      return { 
        ...state, 
        todos: [...state.todos, action.data]
      };
    }
  }
}

export const MyComponent = (props: MyComponentProps) => {

  const [state, dispatch] = useReducer(reducer, { todos: [] });

  const addTodo = (description: string) => {
    dispatch({ 
      type: "add", 
      data: { 
        description
      }
    });
  }

  return (
    <>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </>
  )
}

const getAllTodoRequest = (params: any) => (dispatch: Dispatch<any>) => {

  // send the request
  dispatch({ type: "request" });

  axios.get("https://jsonplaceholder.typicode.com/posts").then(
    (response) => {
      dispatch({ type: "request_success", data: response.data })
    },
    () => {
      dispatch({ type: "request_fail" })
    }
  );
}



const AnotherComponent = () => {
  return (
    <div> Aye </div>
  )
}