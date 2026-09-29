import Link from "next/link";

const navItems = [
  { href: "/", label: "Overview", number: "00" },
  { href: "/analyze", label: "Analyze", number: "01" },
  { href: "/memory", label: "Memory", number: "02" },
  { href: "/incidents", label: "Incidents", number: "03" },
  { href: "/chat", label: "Memory Copilot", number: "04" },
  { href: "/analytics", label: "Analytics", number: "05" },
  { href: "/resolve", label: "Resolve", number: "06" },
];

const kpis = [
  {
    label: "Historical incidents",
    value: "03",
    detail: "Canonical incidents in the demo",
  },
  {
    label: "Services in memory",
    value: "03",
    detail: "Authentication · Redis · Payments",
  },
  {
    label: "Memory actions",
    value: "02",
    detail: "Recall + retain workflows",
  },
  {
    label: "AI copilot",
    value: "01",
    detail: "Groq reasoning layer",
  },
];

const services = [
  {
    service: "Payment API",
    incidents: "01",
    severity: "SEV-1",
    status: "High memory relevance",
    description: "Database connection exhaustion pattern retained.",
  },
  {
    service: "Authentication",
    incidents: "01",
    severity: "SEV-1",
    status: "Historical pattern found",
    description: "Certificate rotation failure retained.",
  },
  {
    service: "Redis Cache",
    incidents: "01",
    severity: "SEV-2",
    status: "Historical pattern found",
    description: "Eviction-policy failure retained.",
  },
];

const activity = [
  {
    id: "INC-AUTH-001",
    title: "Authentication outage",
    detail: "Certificate rotation failure",
    date: "14 Aug 2026",
    type: "Memory retained",
  },
  {
    id: "INC-CACHE-001",
    title: "Redis cache degradation",
    detail: "Eviction policy disabled",
    date: "22 Aug 2026",
    type: "Memory retained",
  },
  {
    id: "INC-PAY-001",
    title: "Payment API timeouts",
    detail: "Analytics query exhausted DB connections",
    date: "05 Sep 2026",
    type: "Memory retained",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f5f0] text-[#111111]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col bg-[#111111] text-white lg:flex">
          <div className="border-b border-white/10 px-6 py-7">
            <Link href="/" className="block">
              <div className="text-sm font-semibold tracking-[0.2em]">
                INCIDENT MEMORY
              </div>
              <div className="text-sm font-semibold tracking-[0.2em] text-white/60">
                COPILOT
              </div>
            </Link>

            <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Memory connected
            </div>
          </div>

          <div className="px-4 py-5">
            <p className="px-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
              Operator Console
            </p>

            <nav className="mt-4 space-y-1">
              {navItems.map((item) => {
                const active = item.href === "/";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition ${
                      active
                        ? "bg-white text-[#111111]"
                        : "text-white/55 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={`text-[10px] ${
                        active ? "text-[#77776f]" : "text-white/25"
                      }`}
                    >
                      {item.number}
                    </span>

                    <span className="text-xs uppercase tracking-[0.12em]">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto border-t border-white/10 p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Central memory
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold">Hindsight</p>
              <p className="mt-2 text-xs leading-5 text-white/45">
                Organizational knowledge recalled before AI reasoning.
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.14em] text-emerald-400">
                  Connected
                </span>

                <span className="text-xs text-white/30">
                  03 records
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Top operator bar */}
          <header className="border-b border-black/10 bg-[#f6f5f0]/95 backdrop-blur">
            <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d8d85]">
                  00 / Overview
                </p>
                <h1 className="mt-1 text-lg font-semibold tracking-tight">
                  Incident Operations
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-black/10 bg-white px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-[#77776f]">
                  Production Demo
                </div>

                <div className="flex items-center gap-2 rounded-full border border-emerald-800/30 bg-[#edf7ef] px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
                  Hindsight connected
                </div>

                <Link
                  href="/analyze"
                  className="rounded-full bg-[#111111] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#2a2a2a]"
                >
                  New Analysis
                </Link>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] px-6 py-8 md:px-8 md:py-10">
            {/* Hero */}
            <section className="border-b border-black/10 pb-10">
              <div className="grid gap-8 xl:grid-cols-[1.5fr_0.8fr] xl:items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d8d85]">
                    Central organizational memory
                  </p>

                  <h2 className="mt-4 max-w-5xl text-4xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
                    REMEMBER
                    <br />
                    BEFORE YOU
                    <br />
                    RESPOND.
                  </h2>

                  <p className="mt-6 max-w-2xl text-sm leading-7 text-[#575751] md:text-base">
                    Hindsight gives the incident copilot a memory of previous
                    failures, resolutions, and engineering lessons before Groq
                    generates its reasoning.
                  </p>
                </div>

                <div className="rounded-3xl border border-black/10 bg-[#111111] p-6 text-white md:p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                    Memory pipeline
                  </p>

                  <div className="mt-7 space-y-5">
                    {[
                      ["01", "Recall", "Find relevant history"],
                      ["02", "Reason", "Generate grounded guidance"],
                      ["03", "Resolve", "Capture the outcome"],
                      ["04", "Retain", "Make the lesson reusable"],
                    ].map(([number, title, description]) => (
                      <div
                        key={number}
                        className="flex gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0"
                      >
                        <span className="text-[10px] text-white/30">
                          {number}
                        </span>

                        <div>
                          <p className="text-sm font-semibold">{title}</p>
                          <p className="mt-1 text-xs leading-5 text-white/40">
                            {description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* KPIs */}
            <section className="grid border-b border-black/10 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map((kpi, index) => (
                <div
                  key={kpi.label}
                  className={`border-black/10 p-6 md:p-7 ${
                    index !== kpis.length - 1
                      ? "border-b sm:border-r xl:border-b-0"
                      : ""
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#8d8d85]">
                    {kpi.label}
                  </p>

                  <div className="mt-4 text-4xl font-semibold tracking-tight">
                    {kpi.value}
                  </div>

                  <p className="mt-2 text-xs leading-5 text-[#77776f]">
                    {kpi.detail}
                  </p>
                </div>
              ))}
            </section>

            {/* Main dashboard grid */}
            <section className="grid gap-8 py-8 xl:grid-cols-[1.15fr_0.85fr]">
              {/* Service watchlist */}
              <div className="rounded-3xl border border-black/10 bg-white">
                <div className="flex items-end justify-between border-b border-black/10 p-6 md:p-7">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#8d8d85]">
                      Service watchlist
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      Where memory is concentrated
                    </h3>
                  </div>

                  <Link
                    href="/analytics"
                    className="text-xs text-[#77776f] transition hover:text-[#111111]"
                  >
                    View analytics &rarr;
                  </Link>
                </div>

                <div className="divide-y divide-black/10">
                  {services.map((service) => (
                    <div key={service.service} className="p-6 md:p-7">
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-emerald-700" />
                            <h4 className="font-semibold">
                              {service.service}
                            </h4>
                          </div>

                          <p className="mt-2 max-w-xl text-sm leading-6 text-[#77776f]">
                            {service.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-5">
                          <div className="text-right">
                            <p className="text-[10px] uppercase tracking-[0.14em] text-[#a3a39b]">
                              Records
                            </p>
                            <p className="mt-1 text-lg font-semibold">
                              {service.incidents}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-[10px] uppercase tracking-[0.14em] text-[#a3a39b]">
                              Severity
                            </p>
                            <p className="mt-1 text-sm font-semibold">
                              {service.severity}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                        <span className="text-[10px] uppercase tracking-[0.14em] text-emerald-800">
                          {service.status}
                        </span>

                        <Link
                          href="/memory"
                          className="text-xs text-[#77776f] transition hover:text-[#111111]"
                        >
                          Explore memory &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Incident activity */}
              <div className="rounded-3xl border border-black/10 bg-white">
                <div className="flex items-end justify-between border-b border-black/10 p-6 md:p-7">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#8d8d85]">
                      Incident activity
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      Recent organizational lessons
                    </h3>
                  </div>

                  <Link
                    href="/incidents"
                    className="text-xs text-[#77776f] transition hover:text-[#111111]"
                  >
                    Archive &rarr;
                  </Link>
                </div>

                <div className="divide-y divide-black/10">
                  {activity.map((item, index) => (
                    <div key={item.id} className="p-6 md:p-7">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#111111]" />
                          {index !== activity.length - 1 && (
                            <span className="mt-2 h-full min-h-12 w-px bg-black/10" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col justify-between gap-2 sm:flex-row">
                            <p className="text-xs font-semibold">
                              {item.id}
                            </p>
                            <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a39b]">
                              {item.date}
                            </p>
                          </div>

                          <h4 className="mt-2 text-sm font-semibold">
                            {item.title}
                          </h4>

                          <p className="mt-1 text-xs leading-5 text-[#77776f]">
                            {item.detail}
                          </p>

                          <div className="mt-3 inline-flex rounded-full border border-emerald-800/30 bg-[#edf7ef] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-emerald-800">
                            {item.type}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Hindsight central panel */}
            <section className="grid gap-8 pb-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#8d8d85]">
                  Memory activity
                </p>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  Hindsight is the memory layer.
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#77776f]">
                  Historical incident knowledge is recalled before the AI
                  reasons over a new failure. Resolutions can then be retained
                  so the organization learns continuously.
                </p>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-black/10 bg-[#f6f5f0] p-4">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#8d8d85]">
                      Historical records
                    </p>
                    <p className="mt-3 text-3xl font-semibold">03</p>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-[#f6f5f0] p-4">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#8d8d85]">
                      Latest recall hits
                    </p>
                    <p className="mt-3 text-3xl font-semibold">05</p>
                  </div>
                </div>
                <div className="mt-6 border-t border-black/10 pt-6">
  <div className="flex items-center justify-between text-xs">
    <span className="text-[#77776f]">Hindsight memory status</span>
    <span className="text-emerald-800">CONNECTED</span>
  </div>

  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e9e8e2]">
    <div className="h-full w-full rounded-full bg-emerald-700" />
  </div>

  <p className="mt-3 text-xs leading-5 text-[#8d8d85]">
    Historical knowledge is available for incident recall and resolution
    retention.
  </p>
</div>
              </div>

              <div className="rounded-3xl border border-black/10 bg-[#e9e8e2] p-6 md:p-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#77776f]">
                      Central memory flow
                    </p>

                    <h3 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight">
                      From incident history to reusable engineering knowledge.
                    </h3>
                  </div>

                  <div className="rounded-full border border-black/10 bg-white px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-[#77776f]">
                    Hindsight
                  </div>
                </div>

                <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 md:grid-cols-4">
                  {[
                    ["01", "RECALL", "Relevant history"],
                    ["02", "REASON", "Memory-informed AI"],
                    ["03", "RESOLVE", "Engineer action"],
                    ["04", "RETAIN", "Future knowledge"],
                  ].map(([number, title, description]) => (
                    <div key={number} className="bg-white p-5">
                      <span className="text-[10px] text-[#a3a39b]">
                        {number}
                      </span>

                      <p className="mt-7 text-xs font-semibold tracking-[0.12em]">
                        {title}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-[#77776f]">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/memory"
                    className="rounded-full bg-[#111111] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#2a2a2a]"
                  >
                    Explore memory &rarr;
                  </Link>

                  <Link
                    href="/chat"
                    className="rounded-full border border-black/15 bg-white px-5 py-3 text-xs uppercase tracking-[0.12em] text-[#111111] transition hover:bg-[#f6f5f0]"
                  >
                    Ask Memory Copilot &rarr;
                  </Link>
                </div>
              </div>
            </section>

            {/* Bottom CTA */}
            <section className="rounded-3xl border border-black/10 bg-[#111111] p-7 text-white md:p-10">
              <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div className="max-w-3xl">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                    Operator action
                  </p>

                  <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl">
                    A new incident shouldn&apos;t mean starting from zero.
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-white/45">
                    Describe the failure, recall what the organization already
                    knows, and let the copilot turn that memory into practical
                    next steps.
                  </p>
                </div>

                <Link
                  href="/analyze"
                  className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#e9e8e2]"
                >
                  Start incident analysis &rarr;
                </Link>
              </div>
            </section>

            <footer className="flex flex-col justify-between gap-3 py-8 text-[10px] uppercase tracking-[0.14em] text-[#a3a39b] md:flex-row">
              <span>Incident Memory Copilot</span>
              <span>Hindsight · Groq · Next.js</span>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}