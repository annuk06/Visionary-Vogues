import multer from "multer";
import path from "path";

const ACCEPTED_MIME = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB || 10);

// Memory storage: the file is analyzed and discarded, never written to disk,
// unless the analysis is explicitly saved (see controllers/analyzeController.js).
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (!ACCEPTED_MIME.includes(file.mimetype)) {
    return cb(new Error("Unsupported file type. Please upload a JPG, PNG, or WEBP image."));
  }
  cb(null, true);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_UPLOAD_MB * 1024 * 1024 },
});

// eslint-disable-next-line no-unused-vars
export function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ error: err.message || "Upload failed." });
  }
  next();
}
