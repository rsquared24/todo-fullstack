
import express, { Request, Response } from "express";
import { Service, Model } from "@todos-fullstack/core";

const app = express();
const port = 11223;

app.post("/something", function(req: any, res: Response) {
  // let todo: Todo = {
  //   id: "5c942b83adc3e295adea9e7c",
  //   done: false,
  //   description: `Something ${new Date().getMilliseconds()}`
  // }
  
  // saveTodo(todo).then(
  //   (resp) => {
  //     res.send(resp);
  //   }, 
  //   (err) => { 
  //     res.status(500).send(err);
  //   }
  // )

});

app.get("/something-else", function(req: any, res: any){
  Service.TodoService.getAllTodo().then(
    (resp) => {
      res.send(resp);
    }, 
    (err) => { 
      res.status(500).send(err);
    }
  )
})

app.listen(port, () => console.log(`App listening on port ${port}!`))