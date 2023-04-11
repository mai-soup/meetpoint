import mongoose from "mongoose";
const { Schema } = mongoose;

const imageSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  original_url: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
