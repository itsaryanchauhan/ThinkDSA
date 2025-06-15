// Gemini feedback API route for pseudocode
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// POST /api/gemini-feedback
// Expects: { pseudocode: string, geminiKey: string }
router.post("/gemini-feedback", async (req, res) => {
  const { pseudocode, geminiKey } = req.body;
  if (!pseudocode || !geminiKey) {
    return res
      .status(400)
      .json({ message: "Pseudocode and Gemini API key are required." });
  }
  try {
    // Gemini API endpoint (replace with the actual endpoint if different)
    const geminiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
      geminiKey;
    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: pseudocode }] }],
      }),
    });
    const geminiData = await geminiRes.json();
    if (!geminiRes.ok) {
      return res
        .status(500)
        .json({ message: geminiData.error?.message || "Gemini API error" });
    }
    // Extract feedback from Gemini response
    const feedback =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No feedback received.";
    res.json({ feedback });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get feedback from Gemini API." });
  }
});

export default router;
