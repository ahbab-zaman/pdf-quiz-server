import path from "path";
import Tesseract from "tesseract.js";
import { getStructuredQuestions } from "../services/llmService.js";
import { extractDiagrams } from "../services/diagramService.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function ocrImage(imagePath) {
  const {
    data: { text },
  } = await Tesseract.recognize(imagePath, "eng");
  return text;
}

export const processPDF = async (req, res) => {
  try {
    const filePath = req.file.path;

    // ✅ Extract diagrams
    const images = await extractDiagrams(filePath);
    if (images.length === 0) {
      return res.status(400).json({ error: "No diagrams found in PDF" });
    }

    const host = req.get("host");
    const protocol = req.protocol;
    const uploadsDir = path.resolve(__dirname, "..", "diagrams");

    const ocrResults = await Promise.all(images.map(ocrImage));
    const finalResult = [];

    for (let i = 0; i < images.length; i++) {
      const imgPath = images[i];
      const text = ocrResults[i];

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
