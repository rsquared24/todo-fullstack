
import express from "express";
import bodyParser from "body-parser";
import todoRoute from "./todo.route";

const app = express();
const port = 11223;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/todo", todoRoute)

app.listen(port, () => console.log(`App listening on port ${port}!`))