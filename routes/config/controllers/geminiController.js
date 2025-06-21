//(Handles AI logic & feedback processing)
import fetch from "node-fetch";
import { model, memory } from "../config/langchain.js";

// Validate Gemini API Key
export const validateGeminiKey = async (req, res) => {
  const { geminiKey } = req.body;
  if (!geminiKey) return res.status(400).json({ message: "Gemini API key is required." });

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${geminiKey}


import fetch from "node-fetch";
import { model, memory } from "../config/langchain.js";

// Validate Gemini API Key
export const validateGeminiKey = async (req, res) => {
  const { geminiKey } = req.body;
  if (!geminiKey) return res.status(400).json({ message: "Gemini API key is required." });

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${geminiKey}`;
    const geminiRes = await fetch(geminiUrl);

    if (!geminiRes.ok) {
      const errorData = await geminiRes.json();
      return res.status(400).json({ valid: false, message: errorData.error?.message || "Invalid API key" });
    }

    res.json({ valid: true });
  } catch (err) {
    console.error("Validation Error:", err);
    res.status(500).json({ valid: false, message: "Failed to validate API key." });
  }
};

// Get Feedback from Gemini API with Memory & Structured Categorization
export const getGeminiFeedback = async (req, res) => {
  const { pseudocode, geminiKey } = req.body;
  if (!pseudocode || !geminiKey) return res.status(400).json({ message: "Pseudocode and Gemini API key are required." });

  try {
    await memory.saveContext({ input: pseudocode });

    const response = await model.call({
      input: `Analyze this pseudocode and provide feedback in structured categories:
      1. **Syntax Issues:** Highlight syntax errors.
      2. **Logical Errors:** Identify mistakes in flow.
      3. **Best Practices:** Improve code readability.
      4. **Optimization Suggestions:** Enhance efficiency.

      Consider previous iterations for detailed recommendations.

      Pseudocode:
      ${pseudocode}`,
      memory,
    });

    const feedbackText = response?.text || "No feedback received.";

    const formattedFeedback = {
      syntaxIssues: feedbackText.match(/Syntax Issues:\s*(.*)/)?.[1] || "No syntax errors detected.",
      logicalErrors: feedbackText.match(/Logical Errors:\s*(.*)/)?.[1] || "No logical errors found.",
      bestPractices: feedbackText.match(/Best Practices:\s*(.*)/)?.[1] || "No best practices suggested.",
      optimizationSuggestions: feedbackText.match(/Optimization Suggestions:\s*(.*)/)?.[1] || "No optimization recommendations.",
    };

    res.json({ feedback: formattedFeedback });
  } catch (err) {
    console.error("Gemini Feedback Error:", err);
    res.status(500).json({ message: "Failed to get feedback from Gemini AI." });
  }
};
