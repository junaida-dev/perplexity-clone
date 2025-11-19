"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    const res = await fetch("https://mock-askperplexity.piyushhhxyz.deno.net", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    });

    const reader = res.body.getReader();
    let aiText = "";
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      aiText += decoder.decode(value);

      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last?.role === "assistant") last.content = aiText;
        else copy.push({ role: "assistant", content: aiText });
        return copy;
      });
    }
  }

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-md ${
              m.role === "user" ? "bg-gray-200" : "bg-blue-100"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 border p-2 rounded-md"
          placeholder="Ask something…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
