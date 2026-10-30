import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    passwordHash: { type: String, select: false },
    preferences: {
      styleGoal: String,
      ageRange: String,
      favoriteColor: String,
      budget: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
