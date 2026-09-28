import { NextResponse } from "next/server";
import { HindsightClient } from "@vectorize-io/hindsight-client";

const hindsight = new HindsightClient({
  baseUrl: process.env.HINDSIGHT_API_URL!,
  apiKey: process.env.HINDSIGHT_API_KEY!,
});

const bankId = process.env.HINDSIGHT_BANK_ID!;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      incidentId,
      service,
      severity,
      symptoms,
      rootCause,
      immediateFix,
      permanentFix,
    } = body;

    if (
      !incidentId ||
      !service ||
      !rootCause ||
      !immediateFix ||
      !permanentFix
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "incidentId, service, rootCause, immediateFix and permanentFix are required.",
        },
        { status: 400 }
      );
    }

    const incidentRecord = `
Production Incident: ${incidentId}
Service: ${service}
Severity: ${severity || "Not specified"}

Symptoms:
${symptoms || "Not specified"}

Root Cause:
${rootCause}

Immediate Fix:
${immediateFix}

Permanent Fix:
${permanentFix}

Lesson:
For future incidents with similar symptoms, engineers should consider this historical incident and its resolution.
`;

    await hindsight.retain(bankId, incidentRecord, {
      context: "Production incident resolution and postmortem",
      documentId: incidentId,
    });

    return NextResponse.json({
      success: true,
      message: `Incident ${incidentId} was successfully added to organizational memory.`,
    });
  } catch (error) {
    console.error("Incident resolution error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save incident memory.",
      },
      { status: 500 }
    );
  }
}