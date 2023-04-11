import mongoose from "mongoose";
import Tag from "./Tag";
import User from "./User";
import Image from "./Image";
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
  isPrivate: {
    type: Boolean,
    default: false,
  },
  tags: [Tag],
  members: [User],
  pendingMembers: [User],
  meetups: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Meetup",
    },
  ],
  logo: Image,
});

const Group = mongoose.model("Group", groupSchema);
export default Group;
