import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interaction = await client.interactions.create({
  model: "gemini-3.8-flash",
  input: "In one sentence, explain what an incident response agent does.",
});

console.log("✅ Gemini worked");
console.log(interaction.output_text);