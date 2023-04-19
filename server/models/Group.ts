import mongoose from "mongoose";
import User from "./User";
import ImageSchema from "./ImageSchema";
const { Schema, SchemaTypes } = mongoose;

const groupSchema = new Schema({
  title: String,
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  description: String,
  createdOn: { type: Date, default: Date.now },
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
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  tags: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Tag",
    },
  ],
  members: [
    {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  pendingMembers: [
    {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  meetups: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Meetup",
    },
  ],
  logo: ImageSchema,
});

const Group = mongoose.model("Group", groupSchema);
export default Group;
