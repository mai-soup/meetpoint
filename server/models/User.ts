import mongoose from "mongoose";
import ImageSchema from "./ImageSchema";
const { Schema, SchemaTypes } = mongoose;
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
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
  },
  avatar: ImageSchema,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
export default User;
