import { Service, Model } from "./";

let todo: Model.Todo = {
  id: "5c942b83adc3e295adea9e7c",
  done: false,
  description: `Something ${new Date().getMilliseconds()}`
}

Service.TodoService.saveTodo(todo).then(
  (resp) => {
    console.log(resp);
  }, 
  (err) => { 
    console.log(err)
  }
)