import { Router, Request, Response } from "express";
import { Service, Model } from "@todos-fullstack/core";

const router = Router();
const _todoService = Service.TodoService;

const saveTodo = (id: string, done: boolean, description: string, res: Response) => {
  let todo: Model.Todo = { id, done, description };
  _todoService.saveTodo(todo).then(
    (resp) => {
      res.send(resp);
    }, 
    (err) => { 
      res.status(500).send(err);
    }
  )
}

router.post("/", (req: Request, res: Response) => {
  let body = req.body;
  saveTodo(null, body.done, body.description, res);
})

router.post("/:id", (req: Request, res: Response) => {
  let body = req.body;
  let params = req.params;
  saveTodo(params.id, body.done, body.description, res);
})

router.delete("/:id", (req: Request, res: Response) => {
  let params = req.params;
  _todoService.deleteTodo(params.id).then(
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