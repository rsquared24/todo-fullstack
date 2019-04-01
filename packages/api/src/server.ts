import App from "./app";

const port = App.get("port");

App.listen(port, () => console.log(`App listening on port ${port}!`));