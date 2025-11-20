import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Falta prompt" });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // o el modelo disponible/que quieras usar
      contents: prompt
    });

    // response puede tener estructura con candidates/parts según SDK
    const text = response?.text ?? JSON.stringify(response);
    return res.json({ text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error en servidor", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
