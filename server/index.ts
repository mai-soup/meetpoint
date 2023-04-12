import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express, { Express } from "express";
import mongoose from "mongoose";
import Group from "./models/Group";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import User from "./models/User";
import { userValidator } from "./middleware";

const port = process.env.PORT || 8888;
const DB_URL = "mongodb://127.0.0.1:27017/meetpoint";

const app: Express = express();

mongoose.connect(DB_URL).then(
  () => {
    console.log("connected to db");
  },
  err => {
    console.error("DB CONNECTION ERROR:", err);
  }
);

// session store
const store = MongoStore.create({
  mongoUrl: DB_URL,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: process.env.SESSION_STORE_SECRET!,
  },
});

// sessions
app.use(
  session({
    store,
    name: "mp-sess",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
  })
);

// auth stuff with passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cors({ origin: "http://localhost:5173/", credentials: true }));
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

app.put("/group/:groupId", async (req, res) => {
  const groupId = req.params.groupId;
  const { title, owner, description, location } = req.body;
  await Group.findByIdAndUpdate(groupId, {
    title,
    owner,
    description,
    location,
  });
  res.status(200).send();
});

app.delete("/group/:groupId", async (req, res) => {
  const groupId = req.params.groupId;
  await Group.findByIdAndDelete(groupId);
  res.status(200).send();
});

app.post("/signup", userValidator, async (req, res, next) => {
  const { username, displayName, password } = req.body.user;
  const user = new User({
    username,
    displayName,
    geometry: { type: "Point", coordinates: [0, 0] },
  });
  const newUser = await User.register(user, password);
  req.login(newUser, err => {
    if (err) return next(err);

    // req.flash("Welcome!");
    return res.redirect("/groups");
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
