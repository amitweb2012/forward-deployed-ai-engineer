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

## 🧩 Technology Stack — Currently Implemented

| Layer | Technology | Status |
|---|---|---|
| Frontend | Next.js, React, TypeScript | ✅ Implemented |
| Backend | Python, FastAPI | ✅ Implemented |
| AI | OpenAI API / LLM generation | ✅ Implemented |
| RAG | Document loading, chunking, retrieval, context assembly | ✅ Implemented |
| Embeddings | Local/in-memory embedding baseline | ✅ Implemented |
| Vector Retrieval | In-memory vector retrieval | ✅ Implemented |
| Data | Sample enterprise knowledge documents + metadata | ✅ Implemented |
| Testing | pytest | ✅ Implemented |
| Packaging | Dockerfile | ✅ Implemented |
| Configuration | Pydantic Settings + environment variables | ✅ Implemented |

### What is intentionally NOT implemented yet

The following technologies are **not part of the current application**. They are production-evolution items and should not be interpreted as technologies already used by this project:

- PostgreSQL / pgvector
- OpenAI embedding adapter
- Redis
- Kafka / Avro
- AWS / Azure / EKS / AKS
- Kubernetes / Helm
- Terraform
- GitLab CI / Jenkins / Argo CD
- Prometheus / Grafana
- Splunk / Elastic APM
- OAuth2 / OIDC / JWT / RBAC
- IAM / mTLS / Keycloak
- Claude / Gemini / Hugging Face
- LangChain / LangGraph / MCP
- AI agents / tool calling

These are documented below as possible production extensions.

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

> `MODEL_NAME` and `EMBEDDING_MODEL` are configuration values. The current implementation uses the OpenAI model for generation; the OpenAI embedding adapter remains a roadmap item.

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

## 🔄 Current RAG Workflow

```text
Documents
   ↓
Loader
   ↓
Chunking
   ↓
Local/In-Memory Embedding Baseline
   ↓
In-Memory Vector Retrieval
   ↓
Relevant Context
   ↓
OpenAI LLM
   ↓
Grounded Answer
   ↓
Sources
```

## 🔐 Production Security Roadmap

The following security capabilities are planned rather than currently implemented:

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

### Completed

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

### Planned Production Evolution

- [ ] OpenAI embedding adapter
- [ ] PostgreSQL + pgvector
- [ ] JWT + RBAC
- [ ] Streaming responses
- [ ] RAG evaluation dataset
- [ ] Prometheus / Grafana observability
- [ ] Kubernetes deployment
- [ ] Terraform infrastructure
- [ ] Cloud deployment on AWS/Azure
- [ ] Enterprise authentication and authorization
- [ ] Persistent document/vector storage

## 🎤 Interview Summary

**Problem:** Enterprise knowledge is distributed across documents and systems.

**Current solution:** A Next.js application calls a Python/FastAPI RAG backend, which performs document loading, chunking, in-memory retrieval, and context assembly before using OpenAI to generate a grounded response.

**Current engineering stack:** Python + FastAPI + OpenAI + RAG + in-memory retrieval + Next.js + TypeScript + pytest + Docker.

**Production evolution:** Add persistent vector storage, OpenAI embeddings, authorization, evaluation, observability, Kubernetes, and cloud infrastructure.

## 🔗 Parent Portfolio

[Forward Deployed AI Engineer](https://github.com/amitweb2012/forward-deployed-ai-engineer)
