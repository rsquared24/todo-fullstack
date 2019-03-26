
import express from "express";

const app = express();

app.get("/something", function(req: any, res: any) {
  console.log(req.query.id);
  res.send("something new");
});
