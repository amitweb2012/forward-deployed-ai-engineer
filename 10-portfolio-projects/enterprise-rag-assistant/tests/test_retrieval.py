from app.ingestion.chunker import chunk_text
from app.retrieval.retriever import InMemoryRetriever


def test_retriever_returns_relevant_chunk() -> None:
    retriever = InMemoryRetriever()
    retriever.add(chunk_text("Python services use FastAPI for HTTP APIs.", "python.md", 100, 0))
    retriever.add(chunk_text("Kubernetes runs containers in a cluster.", "k8s.md", 100, 0))

    results = retriever.search("FastAPI HTTP API", top_k=1)

    assert len(results) == 1
    assert results[0].chunk.source == "python.md"
