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
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f6f5f0]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group">
          <div className="text-sm font-semibold tracking-[0.18em] text-[#111111]">
            INCIDENT MEMORY
          </div>
          <div className="text-xs tracking-[0.28em] text-[#77776f]">
            COPILOT
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.16em] text-[#575751] transition hover:text-[#111111]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
  href="/analyze"
  className="rounded-full border border-black/15 px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#111111] transition hover:bg-[#111111] hover:text-white"
>
  Start Analysis
</Link>
      </div>
    </header>
  );
}
