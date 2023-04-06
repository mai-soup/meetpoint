import mongoose from "mongoose";
import cities from "./cities";
import { descriptors, nouns } from "./seedHelpers";
import Group from "../models/Group";
import { loremIpsum } from "lorem-ipsum";

mongoose.connect("mongodb://127.0.0.1:27017/meetpoint");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("db connected");
});

const sample = (arr: string[]): string => {
  const s = arr[Math.floor(Math.random() * arr.length)];
  return s[0].toUpperCase() + s.slice(1);
};

const seedDB = async () => {
  await Group.deleteMany({}); // delete all groups
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const locationString = `${cities[random1000].city}, ${cities[random1000].state}`;
    const coords = [cities[random1000].longitude, cities[random1000].latitude];
    const g = new Group({
      title: `${sample(descriptors)} ${sample(nouns)}`,
      description: loremIpsum({
        sentenceLowerBound: 5,
        sentenceUpperBound: 30,
      }),
      owner: loremIpsum({ count: 2, units: "words" }),
      location: locationString,
      coordinates: coords,
    });
    await g.save();
  }
};

seedDB().then(() => {
  db.close();
});
