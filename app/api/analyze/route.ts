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
    const incident = body.incident;

    if (!incident || typeof incident !== "string") {
      return NextResponse.json(
        { error: "Incident description is required." },
        { status: 400 }
      );
    }

    // 1. Recall relevant historical incidents from Hindsight
    const memoryResponse = await hindsight.recall(bankId, incident);

    const memories = (memoryResponse.results ?? [])
      .slice(0, 5)
      .map((memory) => memory.text)
      .filter(Boolean);

    // 2. Give the incident + historical memories to the LLM
    const prompt = `
You are Incident Memory Copilot, an AI incident-response assistant.

Your job is to analyze the current production incident using relevant historical
incidents remembered by the organization.

CURRENT INCIDENT:
${incident}

HISTORICAL MEMORIES FROM HINDSIGHT:
${
  memories.length > 0
    ? memories.map((memory, index) => `${index + 1}. ${memory}`).join("\n")
    : "No relevant historical memories were found."
}

Instructions:
- Analyze the current incident clearly.
- Use historical memories when they are actually relevant.
- Start your response with exactly one line: "MEMORY USED: YES" when a recalled historical memory is relevant to your analysis or recommendation. Otherwise start with "MEMORY USED: NO".
- Do not invent historical incidents.
- Clearly distinguish historical evidence from your own inference.
- Recommend the first checks or actions an engineer should consider.
- Mention the historical incident when it directly influenced your recommendation.
- Be concise and practical.
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content:
            "You are a careful production incident-response engineer. Give practical, evidence-based troubleshooting guidance.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const analysis =
      completion.choices[0]?.message?.content ||
      "No analysis was generated.";

    return NextResponse.json({
      success: true,
      analysis,
      memories,
      memoryCount: memories.length,
      memoryUsed: analysis.trimStart().startsWith("MEMORY USED: YES"),
    });
  } catch (error) {
    console.error("Incident analysis error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to analyze the incident.",
      },
      { status: 500 }
    );
  }
}