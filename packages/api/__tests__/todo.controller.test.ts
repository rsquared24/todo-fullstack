import { Service, Model } from "@todos-fullstack/core";
import app from "../src/app";
import request from "supertest";

jest.mock("@todos-fullstack/core");

describe("Todo Controller", () => {
  const todoService = Service.TodoService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllTodo", () => {
    const mockGetAllTodo = <jest.Mock> todoService.getAllTodo;

    it("successful response", async () => {
      // assemble
      let todoArrOutput: Array<Model.Todo> = [{
        id: "1234",
        done: false,
        description: "Lorem ipsum"
      }];
  
      mockGetAllTodo.mockImplementation(() => {
        return Promise.resolve(todoArrOutput);
      });
  
      // act
      const response = await request(app).get("/todo");

      // assert
      expect(mockGetAllTodo).toBeCalled();
      expect(response.body).toEqual(todoArrOutput);
      expect(response.status).toBe(200);
    });

    it("unsuccessful response", async () => {
      // assemble
      mockGetAllTodo.mockImplementation(() => {
        return Promise.reject("Lorem ipsum");
      });
      
      // act
      const response = await request(app).get("/todo");

      // assert
      expect(response.error.text).toBe("Lorem ipsum")
      expect(response.status).toBe(500);
    });
  });

  describe("saveTodo", () => {
    const mockSaveTodo = <jest.Mock> todoService.saveTodo;
    let todoInput: any;

    beforeEach(() => {
      todoInput = { done: false, description: "Lorem ipsum" };
    })

    it("insert todo successful response", async () => {
      // assemble
      let todoOutput: any = { ...{ id: "1234" }, ...todoInput };

      mockSaveTodo.mockImplementation(() => {
        return Promise.resolve(todoOutput);
      });

      // act
      const response = await request(app)
        .post("/todo")
        .send(todoInput)
        .set("Accept", "application/json");

      // assert
      expect(mockSaveTodo).toBeCalled();
      expect(mockSaveTodo).toBeCalledWith({ id: null, description: "Lorem ipsum", done: false });
      expect(response.body).toEqual(todoOutput);
      expect(response.status).toBe(200);
    });

    it("insert todo unsuccessful response", async () => {
      mockSaveTodo.mockImplementation(() => {
        return Promise.reject("Lorem ipsum");
      });

      // act
      const response = await request(app)
        .post("/todo")
        .send(todoInput)
        .set("Accept", "application/json");
      
      // assert
      expect(response.error.text).toBe("Lorem ipsum")
      expect(response.status).toBe(500);
    })

    it("update todo successful response", async () => {
      // assemble
      todoInput = { ...{ id: "1234" }, ...todoInput };
      let todoOutput = { ...todoInput };

      mockSaveTodo.mockImplementation(() => {
        return Promise.resolve(todoOutput);
      });

      // act
      const response = await request(app)
        .post("/todo/1234")
        .send(todoInput)
        .set("Accept", "application/json");

      // assert
      expect(mockSaveTodo).toBeCalled();
      expect(mockSaveTodo).toBeCalledWith({ id: "1234", description: "Lorem ipsum", done: false });
      expect(response.body).toEqual(todoOutput);
      expect(response.status).toBe(200);
    });
  });
});