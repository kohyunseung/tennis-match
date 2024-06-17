import mongoose from "mongoose";

const { Schema } = mongoose;

const matchSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  matches: {
    type: Array,
    required: true,
  },
});

export default mongoose.models.Match || mongoose.model("Match", matchSchema);
