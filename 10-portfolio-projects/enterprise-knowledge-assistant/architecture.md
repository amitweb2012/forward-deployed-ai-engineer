# Architecture overview

Nexus Knowledge is a simple local-first knowledge assistant built with Next.js and FastAPI.

- The UI sends a question to `POST /api/v1/ask`.
- FastAPI loads Markdown and text assets from `data/documents`.
- A transparent keyword-overlap baseline chooses relevant passages.
- Demo mode shows grounded excerpts; optional OpenAI mode generates an answer from the passages.
- Source paths are returned for traceability.

This is a learning project, not production RAG. PDF assets are included as sample artifacts but are not parsed by the current indexer.