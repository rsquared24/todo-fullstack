import Todo from "../model/todo";
import { MongoClient, Collection, ObjectId } from "mongodb";

const dbName: string = "todos-fullstack";
const collectionName = "todos";

async function getClient(): Promise<MongoClient> {
  const url: string = "mongodb://localhost:27017";
  return MongoClient.connect(url, { useNewUrlParser: true });
}

function mapDtoToModel(data: any) : Todo {
  return { 
    id: data._id.toString(),
    description: data.description, 
    done: data.done
  };
}

function mapModelToDto(data: Todo) : any {
  return {
    description: data.description,
    done: data.done
  }
}

async function insertTodo(collection: Collection<any>, todo: Todo) : Promise<string> {
  const response = await collection.insertOne(mapModelToDto(todo));

  if(!response || !response.insertedId) return null;
  
  return Promise.resolve(response.insertedId.toHexString());
}

async function updateTodo(collection: Collection<any>, todo: Todo) : Promise<string> {
  const response = await collection.updateOne(
    { "_id": new ObjectId(todo.id) }, 
    { $set: mapModelToDto(todo) }, 
  );
  
  if(!response || response.modifiedCount <= 0) return null;

  return Promise.resolve(todo.id);
}

async function saveTodo(todo: Todo): Promise<Todo> {
  const client = await getClient();
  const todos = client.db(dbName).collection(collectionName);

  try {
    const objectId = todo.id ? await updateTodo(todos, todo) : await insertTodo(todos, todo);
    
    if(!objectId) throw "Todo did not save";

    todo.id = objectId;

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
    return Promise.resolve(response.map(x => mapDtoToModel(x)));
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
