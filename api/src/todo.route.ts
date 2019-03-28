import { Request, Response } from "express";
import { Service, Model } from "@todos-fullstack/core";

const _todoService = Service.TodoService;

export const saveTodo = (req: Request, res: Response): void => {
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
}

export const getAllTodo = (req: Request, res: Response): void => {
  _todoService.getAllTodo().then(
    (resp) => {
      res.send(resp);
    }, 
    (err) => { 
      res.status(500).send(err);
    }
  )
}