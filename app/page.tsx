import Link from "next/link";
import Navbar from "./components/Navbar";

const stats = [
  ["03", "Incident domains"],
  ["03", "Historical incidents"],
  ["02", "Memory actions"],
  ["01", "Live copilot"],
];

const recentIncidents = [
  {
    id: "INC-AUTH-001",
    service: "Authentication",
    severity: "SEV-1",
    cause: "Identity-provider certificate rotation",
    date: "14 Aug 2026",
  },
  {
    id: "INC-CACHE-001",
    service: "Redis Cache",
    severity: "SEV-2",
    cause: "Disabled key-eviction policy",
    date: "22 Aug 2026",
  },
  {
    id: "INC-PAY-001",
    service: "Payment API",
    severity: "SEV-1",
    cause: "Long-running analytics query",
    date: "05 Sep 2026",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="mb-6 text-xs uppercase tracking-[0.28em] text-slate-500">
            00 / INCIDENT OPERATIONS
          </p>

          <div className="max-w-5xl">
            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
              DON&apos;T DEBUG
              <br />
              FROM ZERO.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
              Incident Memory Copilot helps engineers respond to production
              failures using what the organization has already learned.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/analyze"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Analyze an Incident →
              </Link>

              <Link
                href="/memory"
                className="rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:bg-white/5"
              >
                Explore Memory
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {stats.map(([value, label], index) => (
            <div
              key={label}
              className={`p-6 md:p-8 ${
                index !== stats.length - 1 ? "border-r border-white/10" : ""
              }`}
            >
              <div className="text-3xl font-semibold tracking-tight md:text-4xl">
                {value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              01 / THE MEMORY LOOP
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.03em]">
              Every resolved incident should make the next one easier.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
            {[
              ["01", "DESCRIBE", "Capture what engineers are seeing."],
              ["02", "RECALL", "Find relevant organizational memory."],
              ["03", "REASON", "Use Groq to turn memory into guidance."],
              ["04", "REMEMBER", "Retain the resolution for future incidents."],
            ].map(([number, title, description]) => (
              <div key={number} className="bg-slate-950 p-6">
                <div className="text-xs text-slate-600">{number}</div>
                <div className="mt-10 text-sm font-semibold tracking-[0.12em]">
                  {title}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                02 / INCIDENT ARCHIVE
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">
                What the organization already knows.
              </h2>
            </div>

            <Link
              href="/incidents"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              View all incidents →
            </Link>
          </div>

          <div className="mt-10 space-y-3">
            {recentIncidents.map((incident) => (
              <div
                key={incident.id}
                className="grid gap-4 rounded-2xl border border-white/10 bg-slate-950 p-5 md:grid-cols-[150px_1fr_120px_140px]"
              >
                <div className="text-sm font-semibold">{incident.id}</div>

                <div>
                  <div className="font-medium">{incident.service}</div>
                  <div className="mt-1 text-sm text-slate-500">
                    {incident.cause}
                  </div>
                </div>

                <div className="text-xs uppercase tracking-[0.12em] text-slate-500">
                  {incident.severity}
                </div>

                <div className="text-sm text-slate-500">{incident.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            03 / OPERATIONS
          </p>

          <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-semibold tracking-[-0.03em]">
                Ask the memory. Analyze the incident. Preserve the lesson.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-500">
                One workspace for incident analysis, organizational memory,
                historical context, and resolution capture.
              </p>
            </div>

            <Link
              href="/chat"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Ask Memory Copilot →
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-slate-600 md:flex-row">
          <span>Incident Memory Copilot</span>
          <span>Hindsight × Groq × Next.js</span>
        </div>
      </footer>
    </main>
  );
}