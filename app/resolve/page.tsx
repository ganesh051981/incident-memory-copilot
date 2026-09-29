"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

type Resolution = {
  incidentId: string;
  service: string;
  severity: string;
  symptoms: string;
  rootCause: string;
  immediateFix: string;
  permanentFix: string;
};

export default function ResolvePage() {
  const [form, setForm] = useState<Resolution>({
    incidentId: "",
    service: "",
    severity: "SEV-2",
    symptoms: "",
    rootCause: "",
    immediateFix: "",
    permanentFix: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const update = (field: keyof Resolution, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const loadDemo = () => {
    setForm({
      incidentId: "INC-DEMO-004",
      service: "Payment API",
      severity: "SEV-1",
      symptoms:
        "Payment requests timed out while database connection usage approached the pool limit during a reporting workload.",
      rootCause:
        "A long-running analytics query consumed database connections required by transactional payment traffic.",
      immediateFix:
        "Cancelled the offending analytics query and temporarily increased the application connection pool.",
      permanentFix:
        "Moved the reporting workload to a read replica and added monitoring for connection-pool saturation.",
    });

    setMessage("");
  };

  const saveMemory = async () => {
    if (
      !form.incidentId.trim() ||
      !form.service.trim() ||
      !form.rootCause.trim() ||
      !form.immediateFix.trim() ||
      !form.permanentFix.trim()
    ) {
      setMessage("Please complete the required fields before saving.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/resolve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.error || "Failed to save the incident.");
        return;
      }

      setMessage(data.message);
    } catch {
      setMessage("Could not connect to the memory service.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f5f0] text-[#111111]">
      <Navbar />

      <div className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#77776f]">
            06 / RESOLUTION
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.035em] md:text-6xl">
            PRESERVE
            <br />
            THE LESSON.
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#77776f] md:text-base">
            When an incident is resolved, capture what happened and what fixed
            it. That knowledge becomes available to engineers facing similar
            failures later.
          </p>
        </div>

        <section className="mt-12 rounded-3xl border border-black/10 bg-[#111111]/[0.03] p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-black/10 pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#77776f]">
                Resolution record
              </p>
              <p className="mt-2 text-sm text-[#8d8d85]">
                Required fields are marked by the workflow itself.
              </p>
            </div>

            <button
              onClick={loadDemo}
              className="rounded-full border border-black/10 px-5 py-2.5 text-xs uppercase tracking-[0.12em] text-[#575751] transition hover:text-[#111111]"
            >
              Load demo →
            </button>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            <Field
              label="Incident ID"
              value={form.incidentId}
              placeholder="INC-004"
              onChange={(value) => update("incidentId", value)}
            />

            <Field
              label="Service"
              value={form.service}
              placeholder="Payment API"
              onChange={(value) => update("service", value)}
            />

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.14em] text-[#8d8d85]">
                Severity
              </label>

              <select
                value={form.severity}
                onChange={(event) => update("severity", event.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-[#f6f5f0] px-4 py-3 text-sm text-[#111111] outline-none focus:border-black/25"
              >
                <option>SEV-1</option>
                <option>SEV-2</option>
                <option>SEV-3</option>
                <option>SEV-4</option>
              </select>
            </div>
          </div>

          <div className="mt-5">
            <TextArea
              label="Symptoms"
              value={form.symptoms}
              placeholder="What did engineers observe?"
              onChange={(value) => update("symptoms", value)}
            />
          </div>

          <div className="mt-5">
            <TextArea
              label="Root cause"
              value={form.rootCause}
              placeholder="What actually caused the incident?"
              onChange={(value) => update("rootCause", value)}
            />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <TextArea
              label="Immediate fix"
              value={form.immediateFix}
              placeholder="What restored service?"
              onChange={(value) => update("immediateFix", value)}
            />

            <TextArea
              label="Permanent fix"
              value={form.permanentFix}
              placeholder="What prevents recurrence?"
              onChange={(value) => update("permanentFix", value)}
            />
          </div>

          <div className="mt-7 flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {message && (
                <p
                  className={`text-sm ${
                    message.includes("successfully")
                      ? "text-emerald-700"
                      : "text-amber-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>

           <button
  onClick={saveMemory}
  disabled={saving}
  className="rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:opacity-40"
>
  {saving ? "Saving..." : "Save to Hindsight ->"}
</button>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-emerald-700/40 bg-[#edf7ef]/20 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-800">
            The memory loop
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <Step number="01" text="Incident happens" />
            <Step number="02" text="Engineer resolves it" />
            <Step number="03" text="Lesson is retained" />
            <Step number="04" text="Future incident can recall it" />
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.14em] text-[#8d8d85]">
        {label}
      </label>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-[#f6f5f0] px-4 py-3 text-sm text-[#111111] outline-none placeholder:text-[#a3a39b] focus:border-black/25"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.14em] text-[#8d8d85]">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-28 w-full resize-none rounded-2xl border border-black/10 bg-[#f6f5f0] px-4 py-3 text-sm leading-6 text-[#111111] outline-none placeholder:text-[#a3a39b] focus:border-black/25"
      />
    </div>
  );
}

function Step({ number, text }: { number: string; text: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-[#f6f5f0]/50 p-4">
      <div className="text-xs text-emerald-800">{number}</div>
      <p className="mt-3 text-sm leading-6 text-[#575751]">{text}</p>
    </div>
  );
}
