import mongoose from "mongoose";
const { Schema } = mongoose;

const ImageSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export default ImageSchema;
