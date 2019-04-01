import Todo from "../model/todo";
import { MongoClient, ObjectId } from "mongodb";

const dbName: string = "todos-fullstack";
const collectionName = "todos";

async function getClient(): Promise<MongoClient> {
  const url: string = "mongodb://localhost:27017";
  return MongoClient.connect(url, { useNewUrlParser: true });
}

function mapResponse(data: any) : Todo {
  return { 
    id: data._id.toString(),
    description: data.description, 
    done: data.done
  };
}

async function saveTodo(todo: Todo): Promise<Todo> {
  const client = await getClient();
  const todos = client.db(dbName).collection(collectionName);

  try {
    const response = await todos.update({ "_id": new ObjectId(todo.id)}, todo, { upsert: true });
    return Promise.resolve(todo);
  }
  catch(ex) {
    return Promise.reject(ex);
  }
  finally {
    client.close();
  }
}

async function getAllTodo(): Promise<Array<Todo>> {
  const client = await getClient();
  const todos = client.db(dbName).collection(collectionName);

  try {
    const response = await todos.find().toArray();  
    return Promise.resolve(response.map(x => mapResponse(x)));
  }
  catch(ex) {
    return Promise.reject(ex);
  }
  finally {
    client.close();
  }
}

export {
  saveTodo,
  getAllTodo
}
