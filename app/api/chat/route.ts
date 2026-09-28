import { NextResponse } from "next/server";
import { HindsightClient } from "@vectorize-io/hindsight-client";
import Groq from "groq-sdk";

const hindsight = new HindsightClient({
  baseUrl: process.env.HINDSIGHT_API_URL!,
  apiKey: process.env.HINDSIGHT_API_KEY!,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const bankId = process.env.HINDSIGHT_BANK_ID!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body.message;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "A message is required.",
        },
        { status: 400 }
      );
    }

    const memoryResponse = await hindsight.recall(bankId, message.trim());

    const memories = (memoryResponse.results ?? [])
      .slice(0, 8)
      .map((memory) => memory.text)
      .filter(Boolean);

    const memoryContext =
      memories.length > 0
        ? memories
            .map((memory, index) => `MEMORY ${index + 1}: ${memory}`)
            .join("\n")
        : "No relevant organizational memories were found.";

    const prompt = `
You are Memory Copilot for an engineering organization.

Answer the engineer's question using the organization's recalled historical
memory below.

USER QUESTION:
${message.trim()}

RECALLED ORGANIZATIONAL MEMORY:
${memoryContext}

Rules:
- Use historical memory when it is relevant.
- Do not invent incidents, facts, dates, fixes, or metrics.
- Clearly distinguish historical evidence from inference.
- When a memory directly supports an answer, mention the incident ID if available.
- When no relevant memory exists, say that no relevant organizational memory was found.
- Give a concise, practical engineering answer.
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content:
            "You are a careful engineering knowledge assistant grounded in organizational incident memory.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const answer =
      completion.choices[0]?.message?.content ||
      "No response was generated.";

    return NextResponse.json({
      success: true,
      answer,
      memories,
      memoryCount: memories.length,
      memoryUsed: memories.length > 0,
    });
  } catch (error) {
    console.error("Memory Copilot chat error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process the Memory Copilot request.",
      },
      { status: 500 }
    );
  }
}