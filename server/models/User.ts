import mongoose from "mongoose";
import Image from "./Image";
const { Schema, SchemaTypes } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  displayName: String,
  joinedGroups: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Group",
    },
  ],
  pendingGroups: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Group",
    },
  ],
  ownedGroups: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Group",
    },
  ],
  meetups: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Meetup",
    },
  ],
  location: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    required: false,
  },
  avatar: Image,
});

const User = mongoose.model("User", userSchema);
export default User;
