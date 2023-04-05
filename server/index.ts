import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import Meetup from "./models/Meetup";

const port = process.env.PORT || 8888;

const app: Express = express();

mongoose.connect("mongodb://127.0.0.1:27017/meetpoint").then(
  () => {
    console.log("connected to db");
  },
  err => {
    console.error("DB CONNECTION ERROR:", err);
  }
);

app.get("/", (req: Request, res: Response) => {
  res.send("HEYO FROM EXPRESS");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
