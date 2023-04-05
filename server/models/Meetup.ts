import mongoose from "mongoose";
const { Schema } = mongoose;

const meetupSchema = new Schema({
  title: String,
  author: String,
  description: String,
  createdOn: { type: Date, default: Date.now },
  date: { type: Date, default: Date.now },
});

const Meetup = mongoose.model("Meetup", meetupSchema);
export default Meetup;
