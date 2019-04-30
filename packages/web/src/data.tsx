import { Dispatch, useEffect, useState } from "react";
import axios from "axios";

export const useAsyncRequest = <T extends {}>(request: any, dispatch: Dispatch<any>) => {
  const [params, setParams] = useState({} as T);

  useEffect(() => {
    request(params)(dispatch);
  }, [params])

  return setParams;
}

export interface InsertTodoParams {
  description: string
}

export const insertTodoRequest = (params: InsertTodoParams) => (dispatch: Dispatch<any>) => {
  if(!params.description) return;

  dispatch({ type: "request" });

  let todo = {
    description: params.description,
    done: false
  };

  axios.post("http://localhost:11223/todo", todo).then(
    (response) => {
      dispatch({ type: "request_success", data: response.data })
    },
    () => {
      dispatch({ type: "request_fail" })
    }
  );
}

export const insertTodoReducer = (state: any, action: any) => {
  switch(action.type) {
    case "request":
      return {
        ...state,
        isSaving: true
      }
    case "request_success":
      return {
        ...state,
        isSaving: false,
        todo: action.data
      };
    case "request_fail":
      return {
        ...state,
        isSaving: false
      }
    default:
      return state;
  }
}