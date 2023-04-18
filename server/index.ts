import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express, { Express, NextFunction, Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import Group from "./models/Group";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import User from "./models/User";
import { userValidator } from "./middleware";
import catchAsync from "./utils/catchAsync";

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

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

declare global {
  namespace Express {
    interface User {
      username: string;
      _id: ObjectId;
    }
  }
}

app.get("/", (req, res) => {
  res.send("HEYO FROM EXPRESS");
});

app.get(
  "/groups",
  catchAsync(async (req: Request, res: Response) => {
    const groups = await Group.find({});
    res.send(JSON.stringify(groups));
  })
);

app.post(
  "/groups/new",
  catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).send("Unauthorised");
    }

    const { title, description, location } = req.body;
    const owner = await User.findById(req.user._id);
    const g = new Group({ title, description, location, owner });
    await g.save();
    res.send(g._id);
  })
);

app.get(
  "/group/:groupId",
  catchAsync(async (req: Request, res: Response) => {
    const groupId = req.params.groupId;
    const group = await Group.findById(groupId).populate("owner");
    res.send(group);
  })
);

app.put(
  "/group/:groupId",
  catchAsync(async (req: Request, res: Response) => {
    const groupId = req.params.groupId;
    const { title, owner, description, location } = req.body;
    await Group.findByIdAndUpdate(groupId, {
      title,
      owner,
      description,
      location,
    });
    res.status(200).send();
  })
);

app.delete(
  "/group/:groupId",
  catchAsync(async (req: Request, res: Response) => {
    const groupId = req.params.groupId;
    await Group.findByIdAndDelete(groupId);
    res.status(200).send();
  })
);

app.post(
  "/signup",
  userValidator,
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { username, displayName, password } = req.body.user;
    const user = new User({
      username,
      displayName,
      geometry: { type: "Point", coordinates: [0, 0] },
    });
    const newUser = await User.register(user, password);
    req.login(newUser, err => {
      if (err) return next(err);

      return res.send({ username });
    });
  })
);

app.post(
  "/login",
  passport.authenticate("local", {
    keepSessionInfo: true,
  }),
  catchAsync(async (req: Request, res: Response) => {
    let username;
    if (req.user) {
      username = req.user.username;
    }
    res.send({ username });
  })
);

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
