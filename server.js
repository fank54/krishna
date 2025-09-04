// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Apni OpenRouter API key yahan paste karo
const OPENROUTER_API_KEY = "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
";

// Chat route (Gemini free model)
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "Hello, Gemini!";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
          { role: "system", content: "You are Kahana, a friendly AI assistant." },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "⚠️ No response";

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Server error calling Gemini" });
  }
});

// Run server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Kahana backend running on http://localhost:${PORT}`));
