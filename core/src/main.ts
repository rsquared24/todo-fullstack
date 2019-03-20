import Todo from "./model/todo";
import { createTodo, getAllTodo } from "./service/todo.service";

let todo: Todo = new Todo("This was just created");

createTodo(todo).then(function(result) {
  console.log(result);




  getAllTodo().then(function(result2) {
    console.log(result2)
  })
});