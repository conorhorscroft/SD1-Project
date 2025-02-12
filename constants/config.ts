import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables from .env file
dotenv.config();

// Define environment variable schema
const envSchema = z.object({
  GOOGLE_AI_API_KEY: z.string().min(1, "API Key is required"),
});

// Parse and export environment variables
export const env = envSchema.parse({
  GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
});
