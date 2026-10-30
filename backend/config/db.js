import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  // Fail fast instead of buffering queries indefinitely when there's no DB —
  // keeps the API responsive in demo/dev mode without MongoDB running.
  mongoose.set("bufferCommands", false);

  if (!uri) {
    console.warn("MONGODB_URI not set — running without a database connection.");
    return;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    // Do not crash the whole API just because the DB is unreachable in dev/demo mode.
  }
}
