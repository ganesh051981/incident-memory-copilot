"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { href: "/analyze", label: "Analyze", number: "01" },
  { href: "/memory", label: "Memory", number: "02" },
  { href: "/incidents", label: "Incidents", number: "03" },
  { href: "/chat", label: "Memory Copilot", number: "04" },
  { href: "/analytics", label: "Analytics", number: "05" },
  { href: "/resolve", label: "Resolve", number: "06" },
];

export default function DashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f6f5f0] text-[#111111]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col bg-[#111111] text-white lg:flex">
        <div className="border-b border-white/10 px-6 py-7">
          <Link href="/" className="block">
            <div className="text-sm font-semibold tracking-[0.2em]">
              INCIDENT
            </div>
            <div className="text-sm font-semibold tracking-[0.2em] text-white/60">
              MEMORY
            </div>
          </Link>

          <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Hindsight connected
          </div>
        </div>

        <div className="px-4 py-5">
          <p className="px-3 text-[10px] uppercase tracking-[0.2em] text-white/30">
            Operator Console
          </p>

          <nav className="mt-4 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-white/55 transition hover:bg-white/5 hover:text-white"
            >
              <span className="text-[10px] text-white/25">00</span>
              <span className="text-xs uppercase tracking-[0.12em]">
                Overview
              </span>
            </Link>

            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${
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

              <span className="text-xs text-white/30">03 records</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main dashboard area */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f6f5f0]/95 backdrop-blur">
          <div className="flex min-h-20 flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <Link
                href="/"
                className="text-[10px] uppercase tracking-[0.22em] text-[#8d8d85] lg:hidden"
              >
                Incident Memory
              </Link>

              <p className="hidden text-[10px] uppercase tracking-[0.22em] text-[#8d8d85] lg:block">
                Operator Console
              </p>

              <p className="mt-1 text-sm font-semibold">
                {pathname === "/analyze" && "Incident Analysis"}
                {pathname === "/memory" && "Organizational Memory"}
                {pathname === "/incidents" && "Incident Archive"}
                {pathname === "/chat" && "Memory Copilot"}
                {pathname === "/analytics" && "Incident Analytics"}
                {pathname === "/resolve" && "Resolution"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-full border border-black/10 bg-white px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-[#77776f]">
                Production Demo
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-800/30 bg-[#edf7ef] px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
                Hindsight Connected
              </div>

              <Link
                href="/analyze"
                className="rounded-full bg-[#111111] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#2a2a2a]"
              >
                New Analysis
              </Link>
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="overflow-x-auto border-t border-black/10 px-4 py-3 lg:hidden">
            <nav className="flex min-w-max gap-2">
              <Link
                href="/"
                className="rounded-full border border-black/10 bg-white px-3 py-2 text-[10px] uppercase tracking-[0.12em]"
              >
                Overview
              </Link>

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.12em] ${
                    pathname === item.href
                      ? "border-[#111111] bg-[#111111] text-white"
                      : "border-black/10 bg-white text-[#77776f]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}