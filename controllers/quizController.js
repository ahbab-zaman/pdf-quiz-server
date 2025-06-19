import path from "path";
import fs from "fs";
import Tesseract from "tesseract.js";
import { getStructuredQuestions } from "../services/llmService.js";
import { extractDiagrams } from "../services/diagramService.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function ocrImage(imagePath) {
  const {
    data: { text },
  } = await Tesseract.recognize(imagePath, "eng", {
    logger: false,
  });
  return text;
}

export const processPDF = async (req, res) => {
  try {
    const filePath = req.file.path;

    // Extract diagrams (images)
    const images = await extractDiagrams(filePath);
    if (images.length === 0) {
      return res.status(400).json({ error: "No diagrams found in PDF" });
    }

    const host = req.get("host");
    const protocol = req.protocol;
    const uploadsDir = path.resolve(__dirname, "..", "diagrams");

    const finalResult = [];

    for (const imgPath of images) {
      const text = await ocrImage(imgPath); // Sequential OCR

      if (!text.trim()) continue;

      const questions = await getStructuredQuestions(text);
      const filename = path.basename(imgPath);
      const imageUrl = `${protocol}://${host}/diagrams/${filename}`;

      for (let q of questions) {
        finalResult.push({
          image: imageUrl,
          question: q.question,
          options: q.options,
          answer: q.answer,
        });
      }

      // 🧼 Delete the image after processing
      fs.unlink(imgPath, (err) => {
        if (err) console.error(`Failed to delete ${imgPath}`, err);
      });
    }

    if (finalResult.length === 0) {
      return res.status(400).json({ error: "No questions generated from PDF" });
    }

    res.json(finalResult);
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ error: "Error processing PDF" });
  }
};
