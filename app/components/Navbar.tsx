import Link from "next/link";

const links = [
  { href: "/analyze", label: "Analyze" },
  { href: "/memory", label: "Memory" },
  { href: "/incidents", label: "Incidents" },
  { href: "/chat", label: "Chat" },
  { href: "/analytics", label: "Analytics" },
  { href: "/resolve", label: "Resolve" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group">
          <div className="text-sm font-semibold tracking-[0.18em] text-white">
            INCIDENT MEMORY
          </div>
          <div className="text-xs tracking-[0.28em] text-slate-500">
            COPILOT
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.16em] text-slate-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/analyze"
          className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-slate-950"
        >
          Start Analysis
        </Link>
      </div>
    </header>
  );
}