import mongoose from "mongoose";

const Activity = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: String,
  },
});

export default mongoose.model("Activity", Activity);
