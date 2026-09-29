import Link from "next/link";
import Navbar from "../components/Navbar";

const services = [
  { name: "Payment API", incidents: 2, peakLatency: "1.8 s", width: "100%" },
  {
    name: "Authentication",
    incidents: 1,
    peakLatency: "0.9 s",
    width: "50%",
  },
  {
    name: "Redis Cache",
    incidents: 1,
    peakLatency: "0.6 s",
    width: "33%",
  },
];

const severity = [
  { label: "SEV-1", count: 2, width: "67%" },
  { label: "SEV-2", count: 1, width: "33%" },
];

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#f6f5f0] text-[#111111]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-[#77776f]">
            05 / INCIDENT ANALYTICS
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.035em] md:text-6xl">
            SEE THE
            <br />
            PATTERNS.
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#77776f] md:text-base">
            Turn historical incidents into a visual view of where failures
            concentrate and which services require the most attention.
          </p>
        </div>

        {/* Summary cards */}
        <section className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-[#111111]/10 md:grid-cols-4">
          <div className="bg-[#f6f5f0] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[#8d8d85]">
              Incidents
            </p>
            <p className="mt-4 text-4xl font-semibold">03</p>
            <p className="mt-2 text-xs text-[#8d8d85]">
              Demo incident records
            </p>
          </div>

          <div className="bg-[#f6f5f0] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[#8d8d85]">
              Services
            </p>
            <p className="mt-4 text-4xl font-semibold">03</p>
            <p className="mt-2 text-xs text-[#8d8d85]">
              Distinct incident domains
            </p>
          </div>

          <div className="bg-[#f6f5f0] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[#8d8d85]">
              Highest severity
            </p>
            <p className="mt-4 text-4xl font-semibold">SEV-1</p>
            <p className="mt-2 text-xs text-[#8d8d85]">
              02 recorded incidents
            </p>
          </div>

          <div className="bg-[#f6f5f0] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[#8d8d85]">
              Memory
            </p>
            <p className="mt-4 text-4xl font-semibold">ACTIVE</p>
            <p className="mt-2 text-xs text-emerald-700">
              Hindsight connected
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Incidents by service */}
          <section className="rounded-3xl border border-black/10 bg-[#111111]/[0.03] p-6 md:p-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#77776f]">
                  Incident concentration
                </p>
                <h2 className="mt-3 text-xl font-semibold">
                  Incidents by service
                </h2>
              </div>

              <span className="text-xs text-[#8d8d85]">Historical records</span>
            </div>

            <div className="mt-8 space-y-6">
              {services.map((service) => (
                <div key={service.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-[#30302d]">{service.name}</span>
                    <span className="text-[#77776f]">
                      {service.incidents} incident
                      {service.incidents === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-[#111111]"
                      style={{ width: service.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Severity */}
          <section className="rounded-3xl border border-black/10 bg-[#111111]/[0.03] p-6 md:p-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#77776f]">
                  Severity distribution
                </p>
                <h2 className="mt-3 text-xl font-semibold">
                  Incident severity
                </h2>
              </div>

              <span className="text-xs text-[#8d8d85]">Historical records</span>
            </div>

            <div className="mt-8 space-y-6">
              {severity.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-[#30302d]">{item.label}</span>
                    <span className="text-[#77776f]">
                      {item.count} incident{item.count === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-[#111111]"
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-black/10 pt-5 text-sm leading-6 text-[#77776f]">
              Severity is based on the incident records currently stored for
              the hackathon demo.
            </div>
          </section>
        </div>

        {/* Latency */}
        <section className="mt-8 rounded-3xl border border-black/10 bg-[#111111]/[0.03] p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#77776f]">
                Demo telemetry
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Peak latency by service
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77776f]">
                Illustrative latency values for the hackathon dashboard. These
                values are demo telemetry, not live production monitoring data.
              </p>
            </div>

            <Link
              href="/incidents"
              className="text-sm text-[#77776f] transition hover:text-[#111111]"
            >
              Open incident archive →
            </Link>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.name}>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#30302d]">
                    {service.name}
                  </span>
                  <span className="text-sm font-semibold">
                    {service.peakLatency}
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-[#111111]"
                    style={{ width: service.width }}
                  />
                </div>

                <p className="mt-2 text-xs text-[#8d8d85]">
                  Peak observed in demo scenario
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Insight */}
        <section className="mt-8 rounded-3xl border border-black/10 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-[#77776f]">
            04 / OBSERVATION
          </p>

          <div className="mt-5 max-w-3xl">
            <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
              Payment API appears most frequently in the current demo dataset.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#77776f]">
              The visualization helps engineers see where incident memory is
              accumulating. As real incident records grow, this page can be
              connected to measured latency, duration, and service telemetry.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
