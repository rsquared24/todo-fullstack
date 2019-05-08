import { createContext } from "react";

export enum AppAction {
  RequestTodos,
  RequestTodosSuccess,
  RequestTodosFail,
  AddTodo,
  UpdateTodo,
  RemoveTodo,
  FilterTodos,
  RemoveCompletedTodos
}

export interface AppReducerAction {
  type: AppAction,
  response?: any,
  todo?: any,
  filter?: string
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
    case AppAction.FilterTodos: 
      let filteredTodos: Array<any> = [ ...state.todos];
      let filters: any = { "all": null, "completed": true, "active": false };
      let filter = filters[action.filter];

      if(filter) {
        filteredTodos = filteredTodos.map((todo) => todo.done === filter);
      };

      return {
        ...state,
        filteredTodos
      };
    default:
      return state;
  }
}

export const AppContext = createContext(null);
