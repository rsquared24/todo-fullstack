import { saveTodo, getAllTodo, something} from "../src/service/todo.service";
import { MongoClient } from "mongodb";

jest.mock("mongodb");


describe("something", () => {
  it("should do something", async () => {
    
    // let connect = <jest.Mock> MongoClient.connect;

    something();

    // await something();

    // expect(1).toBe(1);

  })
})