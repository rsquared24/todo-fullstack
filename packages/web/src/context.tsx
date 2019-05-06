import { createContext } from "react";

export enum AppAction {
  RequestTodos,
  RequestTodosSuccess,
  RequestTodosFail,
  AddTodo,
  UpdateTodo,
  RemoveTodo
}

export interface AppReducerAction {
  type: AppAction,
  response?: any,
  todo?: any
}

export const appReducer = (state: any, action: AppReducerAction) => {
  switch(action.type) {
    case AppAction.RequestTodos:
      return {
        ...state,
        isLoading: true
      };
    case AppAction.RequestTodosSuccess:
      return {
        ...state,
        isLoading: false,
        todos: action.response
      };
    case AppAction.RequestTodosFail:
      return {
        ...state,
        isLoading: false
      }    
    case AppAction.AddTodo:
      return {
        ...state,
        todos: [ ...state.todos, action.todo ],
      };    
    case AppAction.UpdateTodo:
      return {
        ...state,
        todos: state.todos.map((todo: any) => (todo.id === action.todo.id) ? { ...todo, ...action.todo } : todo)
      };
    case AppAction.RemoveTodo:
      let todos = [...state.todos];
      let idx = todos.findIndex((todo) => todo.id === action.todo.id);
      todos.splice(idx, 1);
      
      return {
        ...state,
        todos: todos
      };
    default:
      return state;
  }
}

export const AppContext = createContext(null);
