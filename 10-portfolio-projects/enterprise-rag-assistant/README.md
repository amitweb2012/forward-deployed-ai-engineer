# 🧠 Enterprise AI Knowledge Assistant — Python RAG

A production-style Python implementation of a Retrieval-Augmented Generation (RAG) assistant. It demonstrates document ingestion, chunking, embeddings, vector retrieval, grounded response generation, a FastAPI API, testing, configuration, and Docker packaging.

> **Portfolio goal:** demonstrate how an AI Engineer / Forward Deployed Engineer turns an enterprise knowledge problem into a testable application rather than a notebook-only demo.

## 🏗️ Architecture

```text
Documents
   ↓
Loader → Chunker → Embeddings → Retriever
                                  ↓
User → FastAPI → RAG Pipeline → LLM Adapter
                                  ↓
                         Answer + Sources
```

The current implementation intentionally uses a **dependency-free local hash embedding** and **MockLLM** so the project runs without an API key. These are adapters, making it straightforward to replace them with a production embedding model, vector database, and LLM provider.

## 📁 Project Structure

```text
enterprise-rag-assistant/
├── app/
│   ├── api/                 # FastAPI routes and schemas
│   ├── config/              # Typed settings
│   ├── embeddings/          # Embedding abstraction
│   ├── generation/          # LLM abstraction
│   ├── ingestion/           # Loading + chunking
│   ├── rag/                 # End-to-end RAG orchestration
│   └── retrieval/           # Vector retrieval
├── data/documents/          # Sample enterprise knowledge
├── scripts/                 # CLI utilities
├── tests/                   # Unit tests
├── Dockerfile
├── .env.example
├── pyproject.toml
└── requirements.txt
```

## 🚀 Run Locally

### 1. Create environment

```bash
python -m venv .venv
source .venv/bin/activate
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Start the API

```bash
uvicorn app.main:app --reload
```

Open `http://localhost:8000/docs` for the interactive API documentation.

### 4. Ask a question

```bash
curl -X POST http://localhost:8000/api/v1/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What should an enterprise AI answer do when evidence is insufficient?","top_k":3}'
```

## 🧪 Run Tests

```bash
pytest
```

## 📚 Ingest Sample Documents

```bash
python scripts/ingest_documents.py
```

The ingestion script demonstrates the document → chunk pipeline. The API's in-memory retriever is intentionally simple for the first implementation; persistence and a production vector store are planned next.

## 🔐 Security Design

The production target includes:

- OAuth2 / OIDC authentication
- JWT validation
- RBAC / document-level authorization
- Secret management
- Prompt-injection testing
- Input/output validation
- Audit logging
- Least-privilege tool access

The current baseline does **not** claim to implement those controls yet; they are part of the next implementation stages.

## 📊 Evaluation

The project evaluates the system across retrieval relevance, groundedness, correctness, abstention, latency, reliability, cost, and security. See [evaluation.md](evaluation.md).

## 🗺️ Roadmap

- [x] Python application structure
- [x] Document loader
- [x] Text chunking
- [x] Local embedding adapter
- [x] In-memory vector retrieval
- [x] LLM adapter
- [x] RAG orchestration
- [x] FastAPI API
- [x] Unit tests
- [x] Dockerfile
- [ ] Persistent vector database
- [ ] Production embedding provider
- [ ] Production LLM provider adapter
- [ ] JWT + RBAC
- [ ] React / Next.js UI
- [ ] RAG evaluation dataset
- [ ] Prometheus / Grafana observability
- [ ] Kubernetes deployment
- [ ] Terraform infrastructure

## 🎤 Interview Summary

**Problem:** Enterprise knowledge is distributed across documents and systems.

**Solution:** Build a RAG pipeline that retrieves relevant approved context before generating an answer.

**Engineering:** Python + FastAPI + modular ingestion/retrieval/generation adapters + automated tests + Docker.

**Production evolution:** Replace local adapters with managed vector storage, production embeddings and an LLM provider; then add authorization, evaluation, observability, and Kubernetes deployment.

## 🔗 Parent Portfolio

[Forward Deployed AI Engineer](https://github.com/amitweb2012/forward-deployed-ai-engineer)
