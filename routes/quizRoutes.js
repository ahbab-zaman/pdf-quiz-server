import express from "express";
import multer from "multer";
import { processPDF } from "../controllers/quizController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB max file size
  },
});

router.post("/upload", upload.single("pdf"), processPDF);

export default router;
