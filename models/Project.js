import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
  image: String,
  project_name: String,
  brief_description: String,
  complete_description: String,
  tech_stack: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Project", projectSchema);
