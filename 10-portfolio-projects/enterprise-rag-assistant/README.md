# 🧠 Enterprise AI Knowledge Assistant

A production-style Retrieval-Augmented Generation (RAG) project that answers questions from enterprise documents and connected business systems while keeping retrieval, authorization, evaluation, and observability explicit.

## 🎯 Problem

Enterprise knowledge is often distributed across documents, APIs, and internal systems. Users need grounded answers without manually searching multiple sources.

## 🏗️ Target Architecture

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   React / Web   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ FastAPI / Auth  │
                    └────────┬────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
        ┌───────────────┐         ┌───────────────┐
        │ Retrieval     │         │ Access Policy │
        │ Pipeline      │         │ / RBAC        │
        └───────┬───────┘         └───────────────┘
                │
                ▼
        ┌───────────────┐
        │ Vector Store  │
        └───────┬───────┘
                │ Context
                ▼
        ┌───────────────┐
        │     LLM       │
        └───────┬───────┘
                │
                ▼
        ┌───────────────┐
        │ Grounded      │
        │ Response      │
        └───────────────┘
```

## 🔄 Workflow

1. Ingest approved documents.
2. Parse and normalize content.
3. Split content into retrievable chunks.
4. Generate embeddings.
5. Store vectors and metadata.
6. Authenticate the user.
7. Apply document-level access rules.
8. Retrieve relevant context.
9. Generate a grounded response.
10. Return citations / source metadata.
11. Capture evaluation and operational signals.

## 🔐 Security Requirements

- Authentication and authorization before retrieval.
- Document-level access control.
- No secrets in source code.
- Input and output validation.
- Prompt-injection testing.
- Audit logging for sensitive operations.
- Least-privilege access to tools and data.

## 📊 Evaluation

| Dimension | Example Metric |
|---|---|
| Retrieval | Recall / relevance |
| Grounding | Answer supported by retrieved context |
| Quality | Correctness / relevance |
| Safety | Injection and policy tests |
| Performance | P50 / P95 latency |
| Cost | Cost per query |
| Reliability | Error / fallback rate |

## 🧰 Planned Stack

- Python + FastAPI
- PostgreSQL + vector search
- LLM provider abstraction
- React / Next.js UI
- Docker
- Kubernetes
- Prometheus + Grafana
- pytest

## 📁 Planned Structure

```text
enterprise-rag-assistant/
├── app/
│   ├── api/
│   ├── auth/
│   ├── ingestion/
│   ├── retrieval/
│   ├── generation/
│   └── evaluation/
├── tests/
├── data/
├── docs/
├── docker/
└── README.md
```

## 🚧 Status

Architecture and portfolio specification phase. Implementation will be added incrementally, with each step tied to a measurable engineering outcome.
