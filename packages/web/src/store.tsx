import { createContext } from "react";

export enum AppAction {
  RequestTodosSuccess,
  AddTodo,
  UpdateTodo,
  RemoveTodo,
  ClearComplete,
  MarkAsComplete,
  MarkAsIncomplete
}

export interface AppReducerAction {
  type: AppAction,
  response?: any,
  todo?: any,
  todos?: Array<any>,
  filter?: string
}

export interface AppState {
  isLoading?: boolean,
  todos?: Array<any>,
  filter?: string,
  filteredTodos?: Array<any>,
}

export const appReducer = (state: any, action: AppReducerAction) => {
  switch(action.type) {
    case AppAction.RequestTodosSuccess:
      return {
        ...state,
        isLoading: false,
        todos: action.response
      };
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
      let remainingTodos = [...state.todos];
      let idx = remainingTodos.findIndex((todo) => todo.id === action.todo.id);
      remainingTodos.splice(idx, 1);

      return {
        ...state,
        todos: remainingTodos
      };
    case AppAction.ClearComplete: 
      return {
        ...state,
        todos: state.todos.filter((todo: any) => !todo.done)
      }
    case AppAction.MarkAsComplete: 
      return {
        ...state,
        todos: state.todos.map((todo: any) => { return { ...todo, done: true }})
      }
    case AppAction.MarkAsIncomplete: 
      return {
        ...state,
        todos: state.todos.map((todo: any) => { return { ...todo, done: false }})
      }
    default:
      return state;
  }
}

export const AppContext = createContext(null);