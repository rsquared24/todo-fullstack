
import Express from "express";
import BodyParser from "body-parser";
import todoRoute from "./todo.route";

const app = Express();
app.set("port", process.env.PORT || 11223);

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }));

app.use("/todo", todoRoute)

export default app;