import { Dispatch } from "react";
import Axios from "axios";

/**
 * Insert Todo command 
 */
enum InsertTodoType {
  Request,
  RequestSuccess,
  RequestFail
}

export const insertTodoRequest = (description: string) => (dispatch: Dispatch<any>) => {
  if(!description) return;

  dispatch({ type: InsertTodoType.Request });

  let todo = {
    description,
    done: false
  };

  Axios.post("http://localhost:11223/todo", todo).then(
    (response) => {
      dispatch({ type: InsertTodoType.RequestSuccess, data: response.data });
    },
    () => {
      dispatch({ type: InsertTodoType.RequestFail })
    }
  );
}

export const insertTodoReducer = (state: any, action: any) => {
  switch(action.type) {
    case InsertTodoType.Request:
      return {
        ...state,
        isSaving: true
      }
    case InsertTodoType.RequestSuccess:
      return {
        ...state,
        isSaving: false,
        todo: action.data
      };
    case InsertTodoType.RequestFail:
      return {
        ...state,
        isSaving: false
      }
    default:
      return state;
  }
}

/**
 * Update Todo command 
 */
enum UpdateTodoType {
  Request,
  RequestSuccess,
  RequestFail
}

export const updateTodoRequest = (id: string, description: string, done: boolean) => (dispatch: Dispatch<any>) => {
  dispatch({ type: UpdateTodoType.Request });

  let todo = {
    description,
    done: false
  };

  Axios.post(`http://localhost;11223/todo/${id}`, todo).then(
    (response) => {
      dispatch({ type: UpdateTodoType.RequestSuccess, data: response.data })
    },
    () => {
      dispatch({ type: UpdateTodoType.RequestFail })
    }
  );
}

export const updateTodoReducer = (state: any, action: any) => {
  switch(action.type) {
    case UpdateTodoType.Request:
      return { 
        ...state, 
        isLoading: true 
      };
    case UpdateTodoType.RequestSuccess:
      return {
        ...state,
        isLoading: false,
        todos: action.data
      };
    case UpdateTodoType.RequestFail:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}

/**
 * GetAll Todo query
 */
enum GetAllTodoType {
  Request,
  RequestSuccess,
  RequestFail
}

export const getAllTodoRequest = () => (dispatch: Dispatch<any>) => { 
  dispatch({ type: GetAllTodoType.Request })

  Axios.get("http://localhost:11223/todo").then(
    (response) => {
      dispatch({ type: InsertTodoType.RequestSuccess, data: response.data })
    },
    () => {
      dispatch({ type: InsertTodoType.RequestFail })
    }
  )
}

export const getAllTodoReducer = (state: any, action: any) => {
  switch(action.type) {
    case GetAllTodoType.Request:
      return { 
        ...state, 
        isLoading: true 
      };
    case GetAllTodoType.RequestSuccess:
      return {
        ...state,
        isLoading: false,
        todos: action.data
      };
    case GetAllTodoType.RequestFail:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}

