# 📄 Digitalize Server

A backend service built to extract, parse, and analyze content from PDF files using OCR and AI tools. It supports file upload, text extraction using Tesseract.js, and AI-powered question generation using OpenAI and Google's Generative AI.

---

## 🌐 Live & Deployment Links

- **Local Server**: [http://localhost:5000](http://localhost:5000)
- **Deployed API**: [https://pdf-quiz-server.onrender.com](https://pdf-quiz-server.onrender.com)

---

## 📚 Table of Contents

- [Introduction](#-introduction)
- [Installation](#-installation)
- [Usage](#-usage)
- [Features](#-features)
- [API Endpoints](#-api-endpoints)
- [Dependencies](#-dependencies)
- [Configuration](#-configuration)
- [Examples](#-examples)
- [Troubleshooting](#-troubleshooting)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🧩 Introduction

This backend powers a PDF-to-quiz application that utilizes AI to generate questions from educational material. It supports PDF upload, text extraction, and smart question generation via multiple AI APIs.

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ahbab-zaman/pdf-quiz-server.git
   cd pdf-quiz-server
   npm install
   node index.js
   ```

## ✨ Features

- 📎 **PDF Upload & Parsing** – Accepts PDF files and extracts readable text.
- 🔤 **OCR Integration** – Uses Tesseract.js to perform OCR on scanned documents.
- 🧠 **AI-Powered Question Generation** – Generates quiz-style questions from content using OpenAI and Google's GenAI.
- 🌐 **RESTful API** – Built with Express.js to provide scalable and maintainable endpoints.
- 📁 **Multer File Handling** – Enables safe and efficient file uploads.
- 🛢️ **MongoDB Integration** – Stores extracted data and questions using Mongoose.
- ⚙️ **Configurable via .env** – Secure environment variables through `dotenv`.
- 🌍 **CORS Enabled** – Cross-origin support for frontend-backend interaction.


```markdown
## 📦 Dependencies

- [express](https://expressjs.com/) – REST API framework
- [mongoose](https://mongoosejs.com/) – MongoDB ODM
- [multer](https://github.com/expressjs/multer) – Middleware for file uploads
- [tesseract.js](https://github.com/naptha/tesseract.js) – Optical character recognition
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) – Extracts text from PDF files
- [openai](https://www.npmjs.com/package/openai) – OpenAI GPT integration
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) – Google's Generative AI API
- [axios](https://axios-http.com/) – HTTP client
- [cors](https://www.npmjs.com/package/cors) – CORS middleware
- [dotenv](https://www.npmjs.com/package/dotenv) – Environment variable loader
```
