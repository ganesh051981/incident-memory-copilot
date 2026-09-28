import Link from "next/link";
import Navbar from "../components/Navbar";

const memories = [
  {
    id: "INC-AUTH-001",
    service: "Authentication Service",
    severity: "SEV-1",
    date: "14 Aug 2026",
    title: "Identity-provider certificate rotation failure",
    summary:
      "Users were unable to log in because a failed certificate rotation caused token validation failures.",
    rootCause:
      "Failed identity-provider certificate rotation.",
    lesson:
      "For 401/503 authentication failures after a configuration change, verify certificate validity, expiry, trust chain and identity-provider configuration.",
  },
  {
    id: "INC-CACHE-001",
    service: "Redis Cache",
    severity: "SEV-2",
    date: "22 Aug 2026",
    title: "Cache eviction policy disabled",
    summary:
      "Application latency increased while cache hit rate dropped close to zero as Redis experienced memory pressure.",
    rootCause:
      "A configuration change disabled the expected key-eviction policy.",
    lesson:
      "For sudden cache misses and latency spikes, check Redis memory, hit rate, eviction policy and recent configuration changes.",
  },
  {
    id: "INC-PAY-001",
    service: "Payment API",
    severity: "SEV-1",
    date: "05 Sep 2026",
    title: "Analytics workload exhausted database connections",
    summary:
      "Payment requests timed out while a long-running analytics query consumed connections from the shared database pool.",
    rootCause:
      "Long-running analytics query on the primary database.",
    lesson:
      "For Payment API timeouts with high connection usage, check long-running analytics queries and verify reporting traffic is routed to a read replica.",
  },
];

export default function MemoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            02 / ORGANIZATIONAL MEMORY
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.035em] md:text-6xl">
            WHAT DID
            <br />
            WE LEARN?
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
            Previous incidents become reusable engineering knowledge. Search
            the organization&apos;s memory before starting from scratch.
          </p>
        </div>

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Memory index
              </p>
              <p className="mt-2 text-sm text-slate-400">
                {memories.length} historical incident records
              </p>
            </div>

            <Link
              href="/analyze"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition hover:bg-white/5"
            >
              Analyze a new incident →
            </Link>
          </div>

          <div className="mt-8 border-y border-white/10">
            {memories.map((memory, index) => (
              <article
                key={memory.id}
                className={`py-7 ${
                  index !== memories.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <div className="grid gap-6 md:grid-cols-[140px_1fr_100px]">
                  <div>
                    <div className="text-sm font-semibold">{memory.id}</div>
                    <div className="mt-2 text-xs text-slate-600">
                      {memory.date}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.14em] text-slate-600">
                      {memory.service}
                    </div>

                    <h2 className="mt-2 text-xl font-semibold">
                      {memory.title}
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                      {memory.summary}
                    </p>

                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.14em] text-slate-600">
                          Root cause
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {memory.rootCause}
                        </p>
                      </div>

                      <div>
                        <div className="text-[11px] uppercase tracking-[0.14em] text-slate-600">
                          Lesson retained
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {memory.lesson}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    {memory.severity}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-8 flex flex-col justify-between gap-4 rounded-3xl border border-emerald-900/50 bg-emerald-950/20 p-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-emerald-400">
              Memory system connected
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Hindsight stores and retrieves incident knowledge for future
              analysis.
            </p>
          </div>

          <span className="rounded-full border border-emerald-800 px-4 py-2 text-xs uppercase tracking-[0.12em] text-emerald-400">
            Hindsight Online
          </span>
        </div>
      </div>
    </main>
  );
}