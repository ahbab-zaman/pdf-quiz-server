import Tesseract from "tesseract.js";
import { exec } from "child_process";
import path from "path";

export const extractTextFromPDF = async (filePath) => {
  const outputImagePath = filePath.replace(".pdf", "-page.jpg");

  return new Promise((resolve, reject) => {
    exec(
      `pdftoppm -jpeg -f 1 -singlefile ${filePath} ${outputImagePath.replace(
        ".jpg",
        ""
      )}`,
      async (err) => {
        if (err) return reject(err);

        try {
          const {
            data: { text },
          } = await Tesseract.recognize(outputImagePath, "eng");
          resolve(text);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
