import Todo from "../model/todo";
import { MongoClient } from "mongodb";

const url: string = "mongodb://localhost:27017";
const dbName: string = "todos-fullstack";

// create
async function createTodo(todo: Todo): Promise<Todo> { 

  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  const collection = client.db(dbName).collection("todos");
  const response = await collection.insertOne(todo);

  return new Promise<Todo>(
    (resolve, reject) => {
      if(!response) reject("Fail");
      resolve(todo);
    })
    .finally(
      () => client.close()
    );
}

// getAll
async function getAllTodo(): Promise<Array<Todo>> {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  const collection = client.db(dbName).collection("todos");
  const response = await collection.find({});

  return new Promise<Array<Todo>>(
    (resolve, reject) => {
      if(!response) reject("Fail");
      
      resolve(null);
    })
    .finally(
      () => client.close()
    );
}

export {
  createTodo,
  getAllTodo
}