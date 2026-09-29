"use client";

import { useState } from "react";
import DashboardShell from "../components/DashboardShell";

type AnalysisResponse = {
  success: boolean;
  analysis?: string;
  memories?: string[];
  memoryCount?: number;
  memoryUsed?: boolean;
  error?: string;
};

export default function AnalyzePage() {
  const [incident, setIncident] = useState("");
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeIncident = async () => {
    if (!incident.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ incident: incident.trim() }),
      });

      const data = await response.json();
      setResult(data);
    } catch {
      setResult({
        success: false,
        error: "Could not connect to the incident analysis service.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardShell>
    <main className="min-h-screen bg-[#f6f5f0] text-[#111111]">
      

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.28em] text-[#77776f]">
            01 / INCIDENT ANALYSIS
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.035em] md:text-6xl">
            WHAT IS
            <br />
            BREAKING?
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#77776f] md:text-base">
            Describe the production symptoms. The copilot searches
            organizational memory before generating its analysis.
          </p>
        </div>

        <section className="rounded-3xl border border-black/10 bg-[#111111]/[0.03] p-6 md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <label className="text-xs uppercase tracking-[0.18em] text-[#77776f]">
              Current incident
            </label>

            <button
              onClick={() =>
                setIncident(
                  "The Payment API is timing out again. Latency has increased sharply, and database connection usage is close to its limit during an analytics workload."
                )
              }
              className="text-xs uppercase tracking-[0.12em] text-[#77776f] transition hover:text-[#111111]"
            >
              Load demo {"->"}
            </button>
          </div>

          <textarea
            value={incident}
            onChange={(e) => setIncident(e.target.value)}
            placeholder="Describe what engineers are seeing..."
            className="min-h-44 w-full resize-none rounded-2xl border border-black/10 bg-[#f6f5f0] p-5 text-sm leading-7 text-[#111111] outline-none placeholder:text-[#a3a39b] focus:border-black/25"
          />

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-xs text-[#8d8d85]">
              Hindsight recall {"->"} Groq reasoning
            </p>

            <button
  onClick={analyzeIncident}
  disabled={loading || !incident.trim()}
  className="rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:opacity-40"
>
  {loading ? "Analyzing..." : "Analyze Incident →"}
</button>
          </div>
        </section>

        {result && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <section className="rounded-3xl border border-black/10 bg-[#111111]/[0.03] p-6 md:p-8">
              <div className="flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#77776f]">
                    Agent reasoning
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">
                    Analysis & immediate actions
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {result.memoryUsed && (
                    <span className="rounded-full border border-emerald-600 bg-[#edf7ef] px-3 py-1 text-xs text-emerald-700">
                      Hindsight Memory Used
                    </span>
                  )}

                  <span className="rounded-full border border-black/10 px-3 py-1 text-xs text-[#77776f]">
                    Groq
                  </span>
                </div>
              </div>

              {result.success ? (
                <div className="mt-6 whitespace-pre-wrap text-sm leading-7 text-[#30302d]">
                  {result.analysis}
                </div>
              ) : (
                <p className="mt-6 text-sm text-red-400">
                  {result.error}
                </p>
              )}
            </section>

            <section className="rounded-3xl border border-black/10 bg-[#111111]/[0.03] p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-[#77776f]">
                Hindsight recall {"->"} Groq reasoning
              </p>

              <div className="mt-4 flex items-end justify-between border-b border-black/10 pb-5">
                <div>
                  <div className="text-4xl font-semibold">
                    {result.memoryCount ?? 0}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8d8d85]">
                    memories recalled
                  </div>
                </div>

                <span className="text-xs text-emerald-700">
                  {result.memoryUsed ? "Relevant history found" : "No memory used"}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {result.memories && result.memories.length > 0 ? (
                  result.memories.map((memory, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-black/10 bg-[#f6f5f0] p-4"
                    >
                      <div className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#8d8d85]">
                        Memory {String(index + 1).padStart(2, "0")}
                      </div>

                      <p className="text-sm leading-6 text-[#575751]">
                        {memory}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-6 text-[#8d8d85]">
                    No relevant historical memory was recalled.
                  </p>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
    </DashboardShell>
  );
}
