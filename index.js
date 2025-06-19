import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import quizRoutes from "./routes/quizRoutes.js";

// Load env variables

const app = express();
app.use(express.json());

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bucolic-sundae-2653c6.netlify.app",
    ],
  })
);

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect DB
connectDB();

// API routes
app.use("/quiz", quizRoutes);
app.use("/diagrams", express.static(path.join(__dirname, "diagrams")));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
