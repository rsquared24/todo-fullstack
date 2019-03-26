

import express, { Request, Response } from "express";
// import Todo from "../../core/src/model/todo";
// import { saveTodo, getAllTodo } from "../../core/src/service/todo.service";


const app = express();

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
  // getAllTodo().then(
  //   (resp) => {
  //     res.send(resp);
  //   }, 
  //   (err) => { 
  //     res.status(500).send(err);
  //   }
  // )
})