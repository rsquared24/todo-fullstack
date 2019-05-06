import { Service, Model } from "./";

let todo: Model.Todo = {
  id: "5cbfc02dd3c58ae982a9d475",
  done: false,
  description: `newbie`
}

// Service.TodoService.saveTodo(todo).then(
//   (resp) => {
//     console.log(resp);
//   }, 
//   (err) => { 
//     console.log(err)
//   }
// )

Service.TodoService.deleteTodo("5ccf8c78a27bcd865f60a104").then(
  (resp) => {
    console.log(resp);
  }, 
  (err) => { 
    console.log(err)
  }
)