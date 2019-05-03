import React from "react";
import { TodoItemComponent } from "./todo-item.component";

export interface TodoListComponentProps { 
  todos: []
}

export const TodoListComponent = (props: TodoListComponentProps) => {
  if(!props.todos) return null;

  return (
    <>
      {props.todos.map((value, index) => <TodoItemComponent key={index} todo={value} /> )}

      <h2> TODOLIST - COMPONENT </h2>
      <pre>
        {JSON.stringify(props.todos, null, 2)}
      </pre>
    </>
  )
}
