import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema(
  { name: String, hex: String },
  { _id: false }
);

const AnalysisSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    skinTone: {
      category: String,
      undertone: String,
    },
    faceShape: {
      category: String,
      explanation: String,
      recommendations: {
        hairstyles: [String],
        glasses: [String],
        beard: [String],
        accessories: [String],
        necklines: [String],
      },
    },
    bodyShape: {
      category: String,
      recommendations: [String],
    },
    palette: {
      best: [ColorSchema],
      neutrals: [ColorSchema],
      careful: [ColorSchema],
    },
    recommendedStyle: String,
    styleTips: [String],
    // Outfit recommendations, keyed by occasion, generated at analysis time.
    outfitsByOccasion: { type: mongoose.Schema.Types.Mixed },
    preferences: {
      styleGoal: String,
      ageRange: String,
      favoriteColor: String,
      budget: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Analysis", AnalysisSchema);
