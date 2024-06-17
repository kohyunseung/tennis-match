import mongoose from "mongoose";

const { Schema } = mongoose;

const rankSchema = new Schema({
  rank: {
    type: Object,
    required: true,
  },
});

export default mongoose.models.Rank || mongoose.model("Rank", rankSchema);
