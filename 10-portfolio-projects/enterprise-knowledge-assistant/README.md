# 🧠 Enterprise Knowledge Assistant

A beginner-friendly, portfolio-ready knowledge assistant built with **Next.js + FastAPI**. Ask questions about sample company documents and see a simple answer with source references.

> This is a small local demo to learn the application flow. It uses a lightweight keyword matching baseline, not a production-grade RAG stack.

## ✨ What is included

- Clean, responsive Next.js user interface
- FastAPI backend with \`/api/v1/ask\` and \`/api/v1/health\`
- Sample Engineering, Security, and Finance knowledge
- Sample PDF documents plus Markdown runbooks and API docs
- Docker Compose to start frontend and backend together
- Works locally without an API key (demo mode)
- Optional OpenAI answer generation through an environment variable

## 🖥️ Architecture

\`\`\`text
User
 │
 ▼
Next.js UI (:3000)
 │ HTTP request
 ▼
FastAPI (:8000)
 │
 ├── Load sample knowledge files
 ├── Find relevant passages
 └── Generate demo answer (or OpenAI answer if configured)
 │
 ▼
Answer + source filenames
\`\`\`

## 📁 Sample knowledge base

\`\`\`text
data/documents/
├── Engineering/
│   ├── Architecture.pdf
│   ├── Deployment Guide.pdf
│   ├── API Documentation.md
│   └── Runbooks/
│       ├── Production Rollback.md
│       └── Service Health Runbook.md
├── Security/
│   ├── Security Policy.pdf
│   ├── Password Policy.pdf
│   └── Incident Response.pdf
└── Finance/
    ├── Expense Policy.pdf
    └── Procurement Policy.pdf
\`\`\`

The sample documents contain fictional, educational policies. The starter backend indexes the accompanying \`.md\` files; PDF text extraction is a straightforward next extension.

## 🚀 Run with Docker (recommended)

### Prerequisites

- Docker Desktop (Mac / Windows) or Docker Engine + Docker Compose plugin (Linux)
- Git

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/amitweb2012/forward-deployed-ai-engineer.git
cd forward-deployed-ai-engineer/10-portfolio-projects/enterprise-knowledge-assistant
\`\`\`

### 2. Configure environment

\`\`\`bash
cp .env.example .env
\`\`\`

No API key is required for the default demo mode.

### 3. Start the application

\`\`\`bash
docker compose up --build
\`\`\`

Open:

- **Web app:** http://localhost:3000
- **FastAPI docs:** http://localhost:8000/docs
- **Health check:** http://localhost:8000/api/v1/health

Stop the app with \`Ctrl+C\`. To stop and remove containers:

\`\`\`bash
docker compose down
\`\`\`

### Optional: use OpenAI

Set the following in \`.env\`:

\`\`\`env
LLM_PROVIDER=openai
OPENAI_API_KEY=your_real_api_key
OPENAI_MODEL=gpt-4o-mini
\`\`\`

Restart containers:

\`\`\`bash
docker compose up --build
\`\`\`

Keep the API key only in the backend environment. Never use a \`NEXT_PUBLIC_*\` variable for secrets or commit real keys.

## 🧑‍💻 Run without Docker

### Backend

Python 3.11+ is recommended.

\`\`\`bash
cd 10-portfolio-projects/enterprise-knowledge-assistant
python -m venv .venv
source .venv/bin/activate     # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
\`\`\`

### Frontend (new terminal)

Node.js 20+ is recommended.

\`\`\`bash
cd 10-portfolio-projects/enterprise-knowledge-assistant/frontend
npm install
cp .env.example .env.local
npm run dev
\`\`\`

Visit http://localhost:3000.

## 🧪 API example

\`\`\`bash
curl -X POST http://localhost:8000/api/v1/ask \\
  -H "Content-Type: application/json" \\
  -d '{"question":"How do I roll back a failed deployment?","top_k":3}'
\`\`\`

Example response:

\`\`\`json
{
  "answer": "For a failed release, pause rollout, inspect health checks and logs, and follow the rollback runbook...",
  "sources": ["Engineering/Runbooks/Production Rollback.md"],
  "retrieved_chunks": 1
}
\`\`\`

## 🔧 Configuration

| Variable | Default | Purpose |
|---|---|---|
| \`LLM_PROVIDER\` | \`mock\` | \`mock\` works without API access; \`openai\` enables OpenAI generation |
| \`OPENAI_API_KEY\` | empty | Server-side OpenAI key, optional |
| \`OPENAI_MODEL\` | \`gpt-4o-mini\` | Generation model when provider is OpenAI |
| \`TOP_K\` | \`4\` | Maximum number of passages used as context |

## 🧭 Learning roadmap

1. **Start here:** run Docker Compose and inspect the UI.
2. Understand the request/response flow between Next.js and FastAPI.
3. Read how the app loads Markdown and splits content into passages.
4. Replace keyword matching with embeddings and a vector database.
5. Add PDF parsing (for example, PyMuPDF) so PDF content is searchable.
6. Add conversation history and streamed responses.
7. Add authentication, role-based access, and document-level permissions.
8. Add automated RAG evaluation, tracing, and observability.

## ⚠️ Demo limitations

- All sample documents and policies are fictional.
- The baseline retriever is intentionally simple and may return imperfect matches.
- The PDFs are example assets; current indexing is based on Markdown files.
- The app has no user authentication or document-level access control. Do not load confidential documents into this demo.
- OpenAI mode sends the question and retrieved text to the configured provider.

## 🛠️ Tech stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** Python, FastAPI, Pydantic
- **AI extension:** OpenAI API (optional)
- **Local development:** Docker, Docker Compose, environment variables

## 🔗 Parent portfolio

[Forward Deployed AI Engineer](https://github.com/amitweb2012/forward-deployed-ai-engineer/tree/main/10-portfolio-projects)

---
Built as a practical starting point for learning enterprise knowledge assistants and FDE-style application integration.
