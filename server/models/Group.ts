import mongoose from "mongoose";
const { Schema } = mongoose;

const groupSchema = new Schema({
  title: String,
  owner: String,
  description: String,
  createdOn: { type: Date, default: Date.now },
  location: String,
  coordinates: [Number, Number],
});

const Group = mongoose.model("Group", groupSchema);
export default Group;
