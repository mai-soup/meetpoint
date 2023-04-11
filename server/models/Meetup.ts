import mongoose from "mongoose";
import Tag from "./Tag";
import User from "./User";
import Image from "./Image";
const { Schema, SchemaTypes } = mongoose;

const meetupSchema = new Schema({
  title: String,
  group: {
    type: SchemaTypes.ObjectId,
    ref: "Group",
    required: true,
  },
  description: String,
  createdOn: { type: Date, default: Date.now },
  happeningOn: { type: Date, default: Date.now },
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
  isOnline: {
    type: Boolean,
    default: false,
  },
  tags: [Tag],
  attendees: [User],
  images: [Image],
});

const Meetup = mongoose.model("Meetup", meetupSchema);
export default Meetup;
