"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

type DocumentItem = { name: string; path: string; department: string; type: string };
type Answer = { answer: string; sources: string[]; retrieved_chunks: number };

const prompts = [
  "How do I roll back a failed deployment?",
  "What should I do if I suspect a security incident?",
  "Which expenses need manager approval?",
  "What are the password requirements?",
];

const icon = {
  sparkle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m12 3 2.1 6.1L20 12l-5.9 2.2L12 21l-2.1-6.8L4 12l5.9-2.9L12 3Z"/><path d="m19 3 .8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8L19 3Z"/></svg>,
  grid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  message: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.2-.7L4 20l1.6-4.2A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8 11h8M8 14h5"/></svg>,
  folder: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6Z"/><path d="m9 12 2 2 4-4"/></svg>,
  activity: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></svg>,
  send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m21 3-7.2 18-3.9-7.1L3 10Z"/><path d="M21 3 9.9 13.9"/></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 3h9l5 5v13H5Z"/><path d="M14 3v5h5M8 14h8M8 17h5"/></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>,
};

function sourceName(path: string) { return path.split("/").pop() || path; }

export default function Home() {
  const [page, setPage] = useState("Overview");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiOnline, setApiOnline] = useState(false);
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [toast, setToast] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    fetch(\`\${API_URL}/health\`).then(r => { if (!r.ok) throw new Error(); return r.json(); }).then(() => setApiOnline(true)).catch(() => setApiOnline(false));
    fetch(\`\${API_URL}/documents\`).then(r => r.json()).then(data => setDocs(data.documents ?? [])).catch(() => setDocs([]));
  }, []);

  const filteredDocs = useMemo(() => docs.filter(doc =>
    (\`\${doc.name} \${doc.path}\`.toLowerCase().includes(search.toLowerCase())) &&
    (department === "All departments" || doc.department === department)
  ), [docs, search, department]);

  async function ask(value = question) {
    const q = value.trim();
    if (!q || loading) return;
    setQuestion(q); setPage("Ask AI"); setLoading(true); setAnswer(null); setError("");
    try {
      const response = await fetch(\`\${API_URL}/ask\`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: q, top_k: 4 }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.detail || "Request failed. Is the FastAPI service running?");
      setAnswer(payload);
      setHistory(items => [q, ...items.filter(item => item !== q)].slice(0, 5));
    } catch (e) { setError(e instanceof Error ? e.message : "Something went wrong."); }
    finally { setLoading(false); }
  }

  function showToast(message: string) { setToast(message); window.setTimeout(() => setToast(""), 2600); }

  const nav = (name: string, svg: React.ReactNode) => <button key={name} onClick={() => setPage(name)} className={\`nav-item \${page === name ? "selected" : ""}\`}>{svg}<span>{name}</span></button>;

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-logo">{icon.sparkle}</div><div><div className="brand-name">Nexus</div><div className="brand-label">KNOWLEDGE AI</div></div></div>
      <div className="nav-heading">WORKSPACE</div>
      <nav className="nav">{nav("Overview", icon.grid)}{nav("Ask AI", icon.message)}{nav("Knowledge library", icon.folder)}{nav("Activity", icon.activity)}</nav>
      <div className="nav-heading manage-heading">PREFERENCES</div>
      <nav className="nav">{nav("Security notes", icon.shield)}</nav>
      <div className="sidebar-spacer"/>
      <div className="workspace-card"><div className="workspace-avatar">D</div><div className="workspace-meta"><strong>Demo workspace</strong><small>Local sample data</small></div><span className="green-dot"/></div>
      <div className="sidebar-foot">Made for teams that need answers.</div>
    </aside>

    <main className="main">
      <header className="topbar"><div className="mobile-brand"><span className="brand-logo small">{icon.sparkle}</span>Nexus</div><div className="crumb">Workspace <span>/</span> <strong>{page}</strong></div><div className="top-right"><div className="connection"><i className={apiOnline ? "online" : ""}/>{apiOnline ? "API connected" : "Waiting for API"}</div><div className="user-avatar">AD</div></div></header>

      <div className="content">
      {page === "Overview" && <>
        <div className="welcome"><div><div className="eyebrow">YOUR COMPANY'S SECOND BRAIN</div><h1>Knowledge, at your fingertips<span className="period">.</span></h1><p>Ask your company knowledge base and get clear answers from the documents you trust.</p></div><div className="welcome-art"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-center">{icon.sparkle}</div><div className="float-chip chip-a">{icon.file}<span>Documents</span></div><div className="float-chip chip-b">{icon.search}<span>Smart search</span></div></div></div>

        <div className="stat-row">
          <div className="stat"><div className="stat-label">Knowledge documents<span className="stat-icon purple">{icon.folder}</span></div><div className="stat-number">{docs.length || "—"}</div><div className="stat-note"><span className="stat-good">3 departments</span> · sample library</div></div>
          <div className="stat"><div className="stat-label">Questions asked<span className="stat-icon blue">{icon.message}</span></div><div className="stat-number">{history.length.toString().padStart(2,"0")}</div><div className="stat-note">In this browser session</div></div>
          <div className="stat"><div className="stat-label">Retrieved passages<span className="stat-icon mint">{icon.search}</span></div><div className="stat-number">{answer?.retrieved_chunks ?? "—"}</div><div className="stat-note">From your latest question</div></div>
        </div>

        <div className="layout-grid">
          <section className="panel ask-panel">
            <div className="panel-head"><div><div className="panel-title">Ask Nexus</div><div className="panel-desc">What would you like to find out today?</div></div><span className="tag">✦ AI ASSISTANT</span></div>
            <form className="ask-form" onSubmit={e => { e.preventDefault(); void ask(); }}><textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="e.g. How do I deploy a service to production?" rows={3} aria-label="Enter a question"/><div className="form-bottom"><span className="hint">Answers are based on sample company documents.</span><button className="primary-btn" disabled={loading || !question.trim()}>{loading ? "Searching..." : "Ask question"}{icon.arrow}</button></div></form>
            <div className="suggest-label">TRY ASKING</div><div className="suggestions">{prompts.map(p => <button key={p} onClick={() => void ask(p)} disabled={loading}>{p}{icon.arrow}</button>)}</div>
            {loading && <div className="loading"><i/>Looking through the knowledge base…</div>}{error && <div className="error" role="alert">{error}</div>}
            {answer && <div className="answer"><div className="answer-top"><span className="answer-spark">{icon.sparkle}</span><div><strong>Answer from Nexus</strong><small>{answer.retrieved_chunks} passages retrieved</small></div></div><div className="answer-copy">{answer.answer}</div>{answer.sources.length > 0 && <div className="sources"><div className="sources-head">SOURCES</div>{answer.sources.map((s,i)=><div className="source" key={s+i}><span className="source-icon">{icon.file}</span><div><strong>{sourceName(s)}</strong><small>{s}</small></div><span className="source-number">0{i+1}</span></div>)}</div>}</div>}
          </section>
          <div className="right-column">
            <section className="panel">
              <div className="panel-head"><div><div className="panel-title">Knowledge collections</div><div className="panel-desc">Browse by department</div></div><button className="text-btn" onClick={() => setPage("Knowledge library")}>View all →</button></div>
              <button className="collection-row" onClick={() => {setDepartment("Engineering");setPage("Knowledge library");}}><span className="collection-icon engineering">{icon.file}</span><span className="collection-main"><strong>Engineering</strong><small>Architecture, APIs, runbooks</small></span><b>{docs.filter(d=>d.department==="Engineering").length || 5}</b></button>
              <button className="collection-row" onClick={() => {setDepartment("Security");setPage("Knowledge library");}}><span className="collection-icon security">{icon.shield}</span><span className="collection-main"><strong>Security</strong><small>Policies & incident response</small></span><b>{docs.filter(d=>d.department==="Security").length || 3}</b></button>
              <button className="collection-row" onClick={() => {setDepartment("Finance");setPage("Knowledge library");}}><span className="collection-icon finance">{icon.activity}</span><span className="collection-main"><strong>Finance</strong><small>Expenses & procurement</small></span><b>{docs.filter(d=>d.department==="Finance").length || 2}</b></button>
            </section>
            <section className="panel activity-panel"><div className="panel-head"><div><div className="panel-title">Recent questions</div><div className="panel-desc">Your current session</div></div><button className="text-btn" onClick={() => setPage("Activity")}>History →</button></div>{history.length ? history.slice(0,3).map(q=><button className="history-row" key={q} onClick={()=>void ask(q)}><span>{icon.message}</span><strong>{q}</strong>{icon.arrow}</button>) : <div className="empty-history"><span>{icon.message}</span><p>Your questions will show up here.<br/>Start by asking Nexus something.</p></div>}</section>
          </div>
        </div>

        <section className="panel recent-panel"><div className="panel-head"><div><div className="panel-title">Recently added to your library</div><div className="panel-desc">A glimpse of your knowledge sources</div></div><button className="text-btn" onClick={()=>setPage("Knowledge library")}>Open library →</button></div><div className="recent-docs">{(docs.length ? docs.slice(0,4) : []).map(d=><div className="recent-doc" key={d.path}><span className="doc-file">{icon.file}</span><div><strong>{d.name}</strong><small>{d.path}</small></div><span className="doc-kind">{d.type}</span></div>)}</div></section>
      </>}

      {page === "Ask AI" && <section className="view-page"><div className="page-heading"><div className="eyebrow">YOUR AI RESEARCH PARTNER</div><h1>Ask Nexus<span className="period">.</span></h1><p>Ask a question, explore the response, and review the source documents.</p></div><section className="panel ask-panel"><div className="panel-head"><div><div className="panel-title">New question</div><div className="panel-desc">The assistant searches sample Markdown knowledge files.</div></div><span className="tag">✦ AI ASSISTANT</span></div><form className="ask-form" onSubmit={e=>{e.preventDefault();void ask();}}><textarea value={question} onChange={e=>setQuestion(e.target.value)} placeholder="What would you like to know?" rows={4}/><div className="form-bottom"><span className="hint">Demo data only · Not for confidential information</span><button className="primary-btn" disabled={loading||!question.trim()}>{loading?"Searching...":"Ask question"}{icon.arrow}</button></div></form>{loading&&<div className="loading"><i/>Looking through the knowledge base…</div>}{error&&<div className="error">{error}</div>}{answer&&<div className="answer"><div className="answer-top"><span className="answer-spark">{icon.sparkle}</span><div><strong>Answer from Nexus</strong><small>{answer.retrieved_chunks} passages retrieved</small></div></div><div className="answer-copy">{answer.answer}</div><div className="sources"><div className="sources-head">SOURCES</div>{answer.sources.map((s,i)=><div className="source" key={s+i}><span className="source-icon">{icon.file}</span><div><strong>{sourceName(s)}</strong><small>{s}</small></div><span className="source-number">0{i+1}</span></div>)}</div></div>}</section><div className="suggestions suggestions-wide">{prompts.map(p=><button key={p} onClick={()=>void ask(p)}>{p}{icon.arrow}</button>)}</div></section>}

      {page === "Knowledge library" && <section className="view-page"><div className="page-heading library-heading"><div><div className="eyebrow">COMPANY KNOWLEDGE</div><h1>Knowledge library<span className="period">.</span></h1><p>Browse the example documents included with this project.</p></div><span className="library-count">{docs.length} DOCUMENTS</span></div><section className="panel"><div className="library-toolbar"><div className="search-box">{icon.search}<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by document name..." aria-label="Search documents"/></div><select value={department} onChange={e=>setDepartment(e.target.value)} aria-label="Department filter"><option>All departments</option><option>Engineering</option><option>Security</option><option>Finance</option></select></div><div className="library-list">{filteredDocs.map(d=><div className="library-item" key={d.path}><span className={\`library-file \${d.department.toLowerCase()}\`}>{icon.file}</span><span className="library-info"><strong>{d.name}</strong><small>{d.path}</small></span><span className="doc-kind">{d.type}</span></div>)}{filteredDocs.length===0&&<div className="empty-history">No files match the current filters.</div>}</div></section><p className="library-note">PDF sample files are included to mirror a realistic company folder. This starter version indexes Markdown and TXT files; PDF parsing is a planned extension.</p></section>}

      {page === "Activity" && <section className="view-page"><div className="page-heading"><div className="eyebrow">YOUR WORKSPACE</div><h1>Question history<span className="period">.</span></h1><p>Questions asked in this browser session.</p></div><section className="panel history-list">{history.length ? history.map(q=><button className="history-row" key={q} onClick={()=>void ask(q)}><span>{icon.message}</span><strong>{q}</strong>{icon.arrow}</button>) : <div className="empty-history"><span>{icon.message}</span><p>No questions yet. Visit Ask AI to get started.</p></div>}</section></section>}

      {page === "Security notes" && <section className="view-page"><div className="page-heading"><div className="eyebrow">SAFETY BY DESIGN</div><h1>Security notes<span className="period">.</span></h1><p>A few important boundaries for this learning project.</p></div><section className="panel security-list">{["This is a local demo and does not authenticate users.","The sample data is fictional and contains no confidential company information.","OpenAI mode sends the question and retrieved context to the configured provider.","Keep OPENAI_API_KEY on the backend. Never expose secrets in NEXT_PUBLIC variables.","Before production use, add identity, document-level access rules, rate limits, audit logs, and prompt-injection testing."].map((s,i)=><div className="security-note" key={s}><span>{icon.shield}</span><p>{s}</p><small>0{i+1}</small></div>)}</section></section>}
      </div>
      <footer className="footer"><span><b>Nexus</b> · Enterprise Knowledge Assistant</span><span>Next.js + FastAPI · Local sample workspace</span></footer>
    </main>
    {toast&&<div className="toast">{toast}</div>}
  </div>;
}
