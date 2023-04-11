import mongoose from "mongoose";
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
