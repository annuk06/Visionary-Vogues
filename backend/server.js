import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

import analyzeRoutes from "./routes/analyze.js";
import outfitsRoutes from "./routes/outfits.js";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Basic abuse protection on the analysis endpoint, which is the most
// expensive call (file upload + inference).
const analyzeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many analysis requests. Please try again shortly." },
});
app.use("/api/analyze", analyzeLimiter);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api", analyzeRoutes);
app.use("/api", outfitsRoutes);
app.use("/api", userRoutes);

app.use(notFound);
app.use(errorHandler);

// Start listening immediately — the API is fully usable without a DB
// connection (analyses just aren't persisted). Connecting to MongoDB happens
// in parallel so a slow/unreachable DB never delays server startup.
app.listen(PORT, () => {
  console.log(`Visionary Vogues API running on port ${PORT}`);
});
connectDB();
