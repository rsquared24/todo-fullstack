
import Express from "express";
import BodyParser from "body-parser";
import * as TodoRoutes from "./todo.route";

const app = Express();
app.set("port", process.env.PORT || 11223);

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }));

app.post("/todo", TodoRoutes.saveTodo);
app.get("/todo", TodoRoutes.getAllTodo);

export default app;