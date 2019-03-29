
import Express from "express";
import BodyParser from "body-parser";
import todoController from "./todo.controller";

const app = Express();
app.set("port", process.env.PORT || 11223);

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }));

app.use("/todo", todoController)

export default app;