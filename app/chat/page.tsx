"use client";

import { FormEvent, useState } from "react";
import DashboardShell from "../components/DashboardShell";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  memoryUsed?: boolean;
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Ask me about previous incidents, root causes, fixes, lessons, or recurring failure patterns.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const askCopilot = async (event?: FormEvent) => {
    event?.preventDefault();

    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((current) => [
      ...current,
      { role: "user", content: userMessage },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: data.error || "Unable to process the request.",
          },
        ]);
        return;
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.answer,
          memoryUsed: data.memoryUsed,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Could not connect to Memory Copilot.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const exampleQuestions = [
    "Have we seen a similar Payment API incident before?",
    "What was the permanent fix for the Redis incident?",
    "What caused the authentication outage?",
  ];

  return (
    <DashboardShell>
    <main className="min-h-screen bg-[#f6f5f0] text-[#111111]">
      

      <div className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-[#77776f]">
            04 / MEMORY COPILOT
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.035em] md:text-6xl">
            ASK THE
            <br />
            ORGANIZATION.
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#77776f] md:text-base">
            Ask questions about incidents, causes, resolutions and lessons.
            Memory Copilot searches Hindsight before Groq generates an answer.
          </p>
        </div>

        <section className="mt-12 overflow-hidden rounded-3xl border border-black/10 bg-[#111111]/[0.03]">
          <div className="border-b border-black/10 p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#77776f]">
                  Conversation
                </p>
                <p className="mt-2 text-sm text-[#8d8d85]">
                  Hindsight → Groq
                </p>
              </div>

              <div className="rounded-full border border-black/10 px-3 py-1 text-xs text-[#77776f]">
                Memory grounded
              </div>
            </div>
          </div>

          <div className="max-h-[560px] space-y-5 overflow-y-auto p-6 md:p-8">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={item.role === "user" ? "ml-auto max-w-2xl" : "max-w-3xl"}
              >
                <div className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#8d8d85]">
                  {item.role === "user" ? "You" : "Memory Copilot"}
                </div>

                <div
                  className={`rounded-2xl border p-5 ${
                    item.role === "user"
                      ? "border-black/10 bg-[#111111]/[0.06]"
                      : "border-black/10 bg-[#f6f5f0]"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-7 text-[#30302d]">
                    {item.content}
                  </div>

                  {item.role === "assistant" && item.memoryUsed && (
                    <div className="mt-4 border-t border-black/10 pt-3">
                      <span className="text-xs uppercase tracking-[0.12em] text-emerald-700">
                        Hindsight memory used
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="max-w-3xl">
                <div className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#8d8d85]">
                  Memory Copilot
                </div>

                <div className="rounded-2xl border border-black/10 bg-[#f6f5f0] p-5 text-sm text-[#8d8d85]">
                  Searching organizational memory...
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-black/10 p-6 md:p-8">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#8d8d85]">
              Try a question
            </p>

            <div className="flex flex-wrap gap-2">
              {exampleQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => setMessage(question)}
                  className="rounded-full border border-black/10 px-3 py-2 text-xs text-[#77776f] transition hover:border-[#111111]/20 hover:text-[#111111]"
                >
                  {question}
                </button>
              ))}
            </div>

            <form onSubmit={askCopilot} className="mt-5">
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about a previous incident..."
                  className="min-h-12 flex-1 rounded-full border border-black/10 bg-[#f6f5f0] px-5 text-sm text-[#111111] outline-none placeholder:text-[#a3a39b] focus:border-black/25"
                />

                <button
  type="submit"
  disabled={loading || !message.trim()}
  className="rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:opacity-40"
>
  {loading ? "Thinking..." : "Ask Groq ->"}
</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
    </DashboardShell>
  );
}
