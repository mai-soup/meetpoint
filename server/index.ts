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
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HEYO FROM EXPRESS");
});

app.get("/groups", async (req, res) => {
  const groups = await Group.find({});
  res.send(JSON.stringify(groups));
});

app.post("/groups/new", async (req, res) => {
  const { title, owner, description, location } = req.body;
  const g = new Group({ title, owner, description, location });
  await g.save();
  res.send(g._id);
});

app.get("/group/:groupId", async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findById(groupId);
  res.send(group);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
