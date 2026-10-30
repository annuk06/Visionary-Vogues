import mongoose from "mongoose";

const SavedOutfitSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    analysisId: { type: mongoose.Schema.Types.ObjectId, ref: "Analysis", required: false },
    outfit: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("SavedOutfit", SavedOutfitSchema);
