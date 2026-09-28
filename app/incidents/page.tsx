import Navbar from "../components/Navbar";

const incidents = [
  {
    id: "INC-AUTH-001",
    service: "Authentication Service",
    severity: "SEV-1",
    status: "Resolved",
    date: "14 Aug 2026",
    cause: "Identity-provider certificate rotation failure",
    fix: "Restored the previous certificate and restarted authentication pods.",
  },
  {
    id: "INC-CACHE-001",
    service: "Redis Cache",
    severity: "SEV-2",
    status: "Resolved",
    date: "22 Aug 2026",
    cause: "Key-eviction policy disabled after a configuration change",
    fix: "Restored the eviction policy and added deployment configuration validation.",
  },
  {
    id: "INC-PAY-001",
    service: "Payment API",
    severity: "SEV-1",
    status: "Resolved",
    date: "05 Sep 2026",
    cause: "Long-running analytics query exhausted database connections",
    fix: "Stopped the query and moved analytics workload to a read replica.",
  },
];

export default function IncidentsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
          03 / INCIDENT ARCHIVE
        </p>

        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.035em] md:text-6xl">
          EVERY FAILURE
          <br />
          LEAVES A LESSON.
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
          A structured history of production incidents, their causes and the
          fixes retained for future response.
        </p>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-600">
              Total incidents
            </p>
            <p className="mt-3 text-3xl font-semibold">03</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-600">
              Resolved
            </p>
            <p className="mt-3 text-3xl font-semibold">03</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-600">
              Services affected
            </p>
            <p className="mt-3 text-3xl font-semibold">03</p>
          </div>
        </div>

        <section className="mt-8 overflow-hidden rounded-3xl border border-white/10">
          {incidents.map((incident, index) => (
            <article
              key={incident.id}
              className={`bg-white/[0.02] p-6 md:p-8 ${
                index !== incidents.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <div className="grid gap-6 md:grid-cols-[150px_1fr_110px]">
                <div>
                  <p className="font-semibold">{incident.id}</p>
                  <p className="mt-2 text-xs text-slate-600">
                    {incident.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-600">
                    {incident.service}
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    {incident.cause}
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    <span className="text-slate-400">Resolution:</span>{" "}
                    {incident.fix}
                  </p>
                </div>

                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  <div>{incident.severity}</div>
                  <div className="mt-3 text-emerald-500">{incident.status}</div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}