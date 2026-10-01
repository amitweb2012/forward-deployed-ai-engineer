"use client";

import { FormEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function ask(event: FormEvent) {
    event.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, top_k: 5 }),
      });
      if (!response.ok) throw new Error("The assistant could not answer the request.");
      const data = await response.json();
      setAnswer(data.answer);
      setSources(data.sources ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">ENTERPRISE AI · RAG</span>
        <h1>Knowledge Assistant</h1>
        <p>Ask questions and receive answers grounded in your enterprise knowledge base.</p>
      </section>

      <section className="card">
        <form onSubmit={ask}>
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about engineering, security, support, or AI usage..."
            rows={5}
          />
          <button disabled={loading || !question.trim()}>{loading ? "Thinking..." : "Ask Assistant"}</button>
        </form>

        {error && <p className="error">{error}</p>}
        {answer && (
          <article className="answer">
            <h2>Answer</h2>
            <p>{answer}</p>
            {sources.length > 0 && (
              <div>
                <h3>Sources</h3>
                <ul>{sources.map((source) => <li key={source}>{source}</li>)}</ul>
              </div>
            )}
          </article>
        )}
      </section>
    </main>
  );
}
