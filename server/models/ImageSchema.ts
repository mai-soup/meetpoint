import mongoose from "mongoose";
const { Schema } = mongoose;

const ImageSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  original_url: {
    type: String,
    required: true,
  },
});

export default ImageSchema;
