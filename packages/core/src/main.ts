import Todo from "./model/todo";
import { saveTodo, getAllTodo } from "./service/todo.service";

let todo: Todo = {
  id: "5c942b83adc3e295adea9e7c",
  done: false,
  description: `Something ${new Date().getMilliseconds()}`
}

saveTodo(todo).then(
  (resp) => {
    console.log(resp);
  }, 
  (err) => { 
    console.log(err)
  }
)