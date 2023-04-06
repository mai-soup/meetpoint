import express, { Express } from "express";
import mongoose from "mongoose";
import Meetup from "./models/Meetup";
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

app.get("/meetups", async (req, res) => {
  const meetups = await Meetup.find({});
  res.send(JSON.stringify(meetups));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
