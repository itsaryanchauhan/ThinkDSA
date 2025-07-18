// Contains the Express.js routes for API validation and feedback processing.

import express from "express";
import { validateGeminiKey, getGeminiFeedback } from "../controllers/geminiController.js";

const router = express.Router();

// Validate Gemini API Key
router.post("/validate-gemini-key", validateGeminiKey);

// Get feedback with memory & structured categorization
router.post("/gemini-feedback", getGeminiFeedback);

export default router;
