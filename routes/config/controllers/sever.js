//Main Express server setup
import express from "express";
import dotenv from "dotenv";
import geminiRoutes from "./routes/gemini.js";

dotenv.config();

const app = express();
app.use(express.json());

// Register Routes
app.use("/api", geminiRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
