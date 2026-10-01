# 🧠 Enterprise AI Knowledge Assistant — OpenAI + Python + Next.js

A portfolio-ready Retrieval-Augmented Generation (RAG) application built with **Python/FastAPI, OpenAI, and Next.js**. It demonstrates how to turn enterprise knowledge into a secure, testable AI application with a clean separation between frontend, backend, retrieval, and model integration.

> **Portfolio goal:** demonstrate Forward Deployed AI Engineering — problem understanding, AI integration, application engineering, security awareness, evaluation, and production evolution.

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │      Next.js UI      │
                         │   TypeScript / React │
                         └──────────┬───────────┘
                                    │ HTTP
                                    ▼
                         ┌──────────────────────┐
                         │    FastAPI Backend   │
                         │       Python         │
                         └──────────┬───────────┘
                                    │
                         ┌──────────▼───────────┐
                         │     RAG Pipeline     │
                         │ Retrieval + Context  │
                         └──────────┬───────────┘
                                    │
                         ┌──────────▼───────────┐
                         │     OpenAI API       │
                         │ LLM Generation       │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         Grounded Answer + Sources
```

## 🧩 Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Backend | Python, FastAPI |
| AI | OpenAI API |
| RAG | Chunking, embeddings, vector retrieval |
| Data | Enterprise documents + metadata |
| Testing | pytest |
| Packaging | Docker |
| Configuration | Pydantic Settings + environment variables |

## 🔐 API Key Security

The **OpenAI API key belongs only on the FastAPI server**.

Never use:

```env
NEXT_PUBLIC_OPENAI_API_KEY=...
```

The Next.js browser application calls the FastAPI backend. The backend reads:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

The real key must never be committed to GitHub.

## 🚀 Backend Setup

```bash
cd 10-portfolio-projects/enterprise-rag-assistant
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Set your local secret in `.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
LLM_PROVIDER=openai
MODEL_NAME=gpt-5-mini
EMBEDDING_MODEL=text-embedding-3-small
```

Start FastAPI:

```bash
uvicorn app.main:app --reload
```

API documentation:

```text
http://localhost:8000/docs
```

## 💻 Next.js Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

The frontend uses:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

Open:

```text
http://localhost:3000
```

## 🧪 Tests

From the backend project directory:

```bash
pytest
```

## 📚 Sample Knowledge

The repository contains a small enterprise knowledge document covering engineering, security, support, and AI usage. It is safe to replace this with your own approved documents.

## 🔄 RAG Workflow

```text
Documents
   ↓
Loader
   ↓
Chunking
   ↓
Embeddings
   ↓
Vector Retrieval
   ↓
Relevant Context
   ↓
OpenAI
   ↓
Grounded Answer
   ↓
Sources
```

## 🔐 Production Security Roadmap

- OAuth2 / OIDC
- JWT validation
- RBAC / document-level authorization
- Secret Manager / Key Vault
- Prompt-injection testing
- Input/output validation
- Audit logging
- Rate limiting
- Least-privilege access

## 📊 Evaluation

The project is designed to evaluate:

- Retrieval relevance
- Groundedness
- Correctness
- Abstention when evidence is insufficient
- Latency
- Reliability
- Token usage and cost
- Security test results

See [evaluation.md](evaluation.md).

## 🗺️ Roadmap

- [x] Python application structure
- [x] Document loader
- [x] Text chunking
- [x] In-memory vector retrieval baseline
- [x] OpenAI LLM adapter
- [x] RAG orchestration
- [x] FastAPI API
- [x] Next.js frontend
- [x] Unit tests
- [x] Dockerfile
- [ ] OpenAI embedding adapter
- [ ] PostgreSQL + pgvector
- [ ] JWT + RBAC
- [ ] Streaming responses
- [ ] RAG evaluation dataset
- [ ] Prometheus / Grafana observability
- [ ] Kubernetes deployment
- [ ] Terraform infrastructure

## 🎤 Interview Summary

**Problem:** Enterprise knowledge is distributed across documents and systems.

**Solution:** A Next.js application calls a Python/FastAPI RAG backend, which retrieves relevant context and uses OpenAI to generate a grounded response.

**Engineering:** Python + FastAPI + OpenAI + modular retrieval/generation + Next.js + TypeScript + tests + Docker.

**Production evolution:** Add persistent vector storage, OpenAI embeddings, authorization, evaluation, observability, Kubernetes, and cloud infrastructure.

## 🔗 Parent Portfolio

[Forward Deployed AI Engineer](https://github.com/amitweb2012/forward-deployed-ai-engineer)
