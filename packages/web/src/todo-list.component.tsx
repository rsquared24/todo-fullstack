import React from "react";
import { TodoItemComponent } from "./todo-item.component";

export interface TodoListComponentProps { 
  todos: []
}

export const TodoListComponent = (props: TodoListComponentProps) => {
  if(!props.todos) return null;

  return (
    <ul className="todo-list">
      {props.todos.map((value, index) => <TodoItemComponent key={index} todo={value} /> )}
    </ul>
  )
}
