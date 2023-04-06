import express, { Express } from "express";
import mongoose from "mongoose";
import Group from "./models/Group";
import cors from "cors";

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

app.use(cors({ origin: "http://localhost:5173/meetups" }));

app.get("/", (req, res) => {
  res.send("HEYO FROM EXPRESS");
});

app.get("/groups", async (req, res) => {
  const groups = await Group.find({});
  res.send(JSON.stringify(groups));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
