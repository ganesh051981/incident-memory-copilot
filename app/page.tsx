"use client";

import { useState } from "react";

type AnalysisResponse = {
  success: boolean;
  analysis?: string;
  memories?: string[];
  memoryCount?: number;
  memoryUsed?: boolean;
  error?: string;
};

type ResolutionForm = {
  incidentId: string;
  service: string;
  severity: string;
  symptoms: string;
  rootCause: string;
  immediateFix: string;
  permanentFix: string;
};

export default function Home() {
  const [incident, setIncident] = useState("");
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const [resolution, setResolution] = useState<ResolutionForm>({
    incidentId: "",
    service: "",
    severity: "SEV-1",
    symptoms: "",
    rootCause: "",
    immediateFix: "",
    permanentFix: "",
  });

  const [savingMemory, setSavingMemory] = useState(false);
  const [memoryMessage, setMemoryMessage] = useState("");

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
        body: JSON.stringify({
          incident: incident.trim(),
        }),
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

  const loadDemoIncident = () => {
    setIncident(
      "Payment API latency has increased and requests are timing out. The database connection pool may be exhausted."
    );
  };

  const loadDemoResolution = () => {
    setResolution({
      incidentId: "INC-003",
      service: "Payment API",
      severity: "SEV-1",
      symptoms:
        "Payment requests are timing out and database connection pool usage is near maximum.",
      rootCause:
        "A long-running analytics query consumed database connections needed by the Payment API.",
      immediateFix:
        "Terminated the long-running query and temporarily increased the database connection pool.",
      permanentFix:
        "Moved the analytics workload to a read replica.",
    });
  };

  const saveResolution = async () => {
    if (
      !resolution.incidentId.trim() ||
      !resolution.service.trim() ||
      !resolution.rootCause.trim() ||
      !resolution.immediateFix.trim() ||
      !resolution.permanentFix.trim()
    ) {
      setMemoryMessage(
        "Please fill in Incident ID, Service, Root Cause, Immediate Fix and Permanent Fix."
      );
      return;
    }

    setSavingMemory(true);
    setMemoryMessage("");

    try {
      const response = await fetch("/api/resolve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resolution),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMemoryMessage(data.error || "Failed to save the incident.");
        return;
      }

      setMemoryMessage(data.message);
    } catch {
      setMemoryMessage("Could not connect to the memory service.");
    } finally {
      setSavingMemory(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-slate-800 bg-slate-950 p-6 md:block">
          <div className="mb-10">
            <h1 className="text-xl font-bold">Incident Memory</h1>
            <p className="text-sm text-slate-400">Copilot</p>
          </div>

          <nav className="space-y-2 text-sm">
            <div className="rounded-lg bg-slate-800 px-4 py-3 font-medium">
              Incident Analysis
            </div>

            <div className="rounded-lg px-4 py-3 text-slate-400">
              Memory
            </div>

            <div className="rounded-lg px-4 py-3 text-slate-400">
              Incident History
            </div>
          </nav>

          <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Memory System
            </p>
            <p className="mt-2 text-sm font-medium">Hindsight</p>
            <p className="mt-1 text-xs text-emerald-400">Connected</p>
          </div>
        </aside>

        {/* Main */}
        <section className="flex-1">
          <header className="border-b border-slate-800 px-6 py-5 md:px-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Production Operations
                </p>
                <h2 className="mt-1 text-2xl font-semibold">
                  Incident Memory Copilot
                </h2>
              </div>

              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Online
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-6xl space-y-6 p-6 md:p-10">
            {/* Incident Analysis */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-5">
                <p className="text-sm font-medium text-slate-300">
                  New Incident
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Describe what is happening in production.
                </p>
              </div>

              <textarea
                value={incident}
                onChange={(e) => setIncident(e.target.value)}
                placeholder="Example: Payment API latency has increased..."
                className="min-h-36 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-500"
              />

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={loadDemoIncident}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
                >
                  Load Demo Incident
                </button>

                <button
                  onClick={analyzeIncident}
                  disabled={loading || !incident.trim()}
                  className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? "Analyzing..." : "Analyze Incident"}
                </button>
              </div>
            </section>

            {/* Analysis Results */}
            {result && (
              <div className="grid gap-6 lg:grid-cols-3">
                <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-300">
                        Agent Analysis
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Current incident + organizational memory
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
  {result.memoryUsed && (
    <span className="rounded-full border border-emerald-700 bg-emerald-950 px-3 py-1 text-xs text-emerald-400">
      Hindsight Memory Used
    </span>
  )}

  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
    Groq
  </span>
</div>
                  </div>

                  {result.success ? (
                    <div className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                      {result.analysis}
                    </div>
                  ) : (
                    <p className="text-sm text-red-400">{result.error}</p>
                  )}
                </section>

                <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <div className="mb-5">
                    <p className="text-sm font-medium text-slate-300">
                      Hindsight Memory
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Historical knowledge recalled for this incident
                    </p>
                  </div>

                  <div className="mb-5 rounded-xl bg-slate-950 p-4">
                    <p className="text-xs text-slate-500">
                      Historical memories found
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                      {result.memoryCount ?? 0}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {result.memories && result.memories.length > 0 ? (
                      result.memories.map((memory, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                        >
                          <p className="mb-1 text-xs text-slate-500">
                            Memory {index + 1}
                          </p>
                          <p className="text-sm leading-6 text-slate-300">
                            {memory}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        No relevant historical memories were found.
                      </p>
                    )}
                  </div>
                </section>
              </div>
            )}

            {/* Resolve & Remember */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-6">
                <p className="text-sm font-medium text-slate-300">
                  Resolve & Remember
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Save the incident resolution to Hindsight so future incidents
                  can benefit from it.
                </p>
              </div>

              <div className="mb-5">
                <button
                  onClick={loadDemoResolution}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
                >
                  Load Demo Resolution
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs text-slate-500">
                    Incident ID
                  </label>
                  <input
                    value={resolution.incidentId}
                    onChange={(e) =>
                      setResolution({
                        ...resolution,
                        incidentId: e.target.value,
                      })
                    }
                    placeholder="INC-003"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm outline-none placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-slate-500">
                    Service
                  </label>
                  <input
                    value={resolution.service}
                    onChange={(e) =>
                      setResolution({
                        ...resolution,
                        service: e.target.value,
                      })
                    }
                    placeholder="Payment API"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm outline-none placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-slate-500">
                    Severity
                  </label>
                  <select
                    value={resolution.severity}
                    onChange={(e) =>
                      setResolution({
                        ...resolution,
                        severity: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm outline-none"
                  >
                    <option>SEV-1</option>
                    <option>SEV-2</option>
                    <option>SEV-3</option>
                    <option>SEV-4</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-xs text-slate-500">
                  Symptoms
                </label>
                <textarea
                  value={resolution.symptoms}
                  onChange={(e) =>
                    setResolution({
                      ...resolution,
                      symptoms: e.target.value,
                    })
                  }
                  placeholder="What engineers observed..."
                  className="min-h-24 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm outline-none placeholder:text-slate-600"
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-xs text-slate-500">
                  Root Cause
                </label>
                <textarea
                  value={resolution.rootCause}
                  onChange={(e) =>
                    setResolution({
                      ...resolution,
                      rootCause: e.target.value,
                    })
                  }
                  placeholder="What actually caused the incident..."
                  className="min-h-24 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm outline-none placeholder:text-slate-600"
                />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs text-slate-500">
                    Immediate Fix
                  </label>
                  <textarea
                    value={resolution.immediateFix}
                    onChange={(e) =>
                      setResolution({
                        ...resolution,
                        immediateFix: e.target.value,
                      })
                    }
                    placeholder="What restored service immediately..."
                    className="min-h-28 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm outline-none placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-slate-500">
                    Permanent Fix
                  </label>
                  <textarea
                    value={resolution.permanentFix}
                    onChange={(e) =>
                      setResolution({
                        ...resolution,
                        permanentFix: e.target.value,
                      })
                    }
                    placeholder="What prevents recurrence..."
                    className="min-h-28 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  onClick={saveResolution}
                  disabled={savingMemory}
                  className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {savingMemory ? "Saving..." : "Save to Hindsight"}
                </button>

                {memoryMessage && (
                  <p className="text-sm text-emerald-400">{memoryMessage}</p>
                )}
              </div>
            </section>

            {/* How it works */}
            {!result && (
              <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    01
                  </p>
                  <h3 className="mt-3 font-semibold">
                    Describe the incident
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Give the copilot the symptoms engineers are seeing.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    02
                  </p>
                  <h3 className="mt-3 font-semibold">
                    Recall organizational memory
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Hindsight searches previous incidents, causes and fixes.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    03
                  </p>
                  <h3 className="mt-3 font-semibold">
                    Learn from resolution
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Resolved incidents become memory for future responses.
                  </p>
                </div>
              </section>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}