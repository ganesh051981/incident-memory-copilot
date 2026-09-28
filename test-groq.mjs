import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const response = await groq.chat.completions.create({
  model: "openai/gpt-oss-20b",
  messages: [
    {
      role: "user",
      content: "In one sentence, explain what an incident response agent does.",
    },
  ],
});

console.log("✅ Groq worked");
console.log(response.choices[0]?.message?.content || "");