//Sets up LangChain models, memory, and configurations for structured AI interactions.
//(Configures LangChain AI model & memory)

import { ChatOpenAI } from "langchain/chat_models";
import { ConversationBufferMemory } from "langchain/memory";
import dotenv from "dotenv";

dotenv.config();

export const model = new ChatOpenAI({
  modelName: "gemini-pro",
  temperature: 0.7,
  apiKey: process.env.GEMINI_API_KEY, // Secure API key usage
});

export const memory = new ConversationBufferMemory(); // Stores past iterations
