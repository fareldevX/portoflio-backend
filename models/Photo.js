import mongoose, { Schema } from "mongoose";

const photoSchema = new Schema({
  name: String,
  imageUrl: String,
});

export default mongoose.model("Photo", photoSchema);
