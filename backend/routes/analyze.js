import { Router } from "express";
import { upload, multerErrorHandler } from "../middleware/upload.js";
import { analyzePhoto, getAnalysis } from "../controllers/analyzeController.js";

const router = Router();

router.post("/analyze", upload.single("photo"), multerErrorHandler, analyzePhoto);
router.get("/analysis/:id", getAnalysis);

export default router;
