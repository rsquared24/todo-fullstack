import { Router, Request, Response } from "express";
import { Service, Model } from "@todos-fullstack/core";

const router = Router();
const _todoService = Service.TodoService;

router.post("/",  (req: Request, res: Response) => {
  let todo: Model.Todo = {
    id: "5c942b83adc3e295adea9e7c",
    done: false,
    description: `Something ${new Date().getMilliseconds()}`
  }
  
  _todoService.saveTodo(todo).then(
    (resp) => {
      res.send(resp);
    }, 
    (err) => { 
      res.status(500).send(err);
    }
  )
})

router.get("/", (req: Request, res: Response) => {
  _todoService.getAllTodo().then(
    (resp) => {
      res.send(resp);
    }, 
    (err) => { 
      res.status(500).send(err);
    }
  )
})

export default router;