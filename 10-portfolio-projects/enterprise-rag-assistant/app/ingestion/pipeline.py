from app.ingestion.chunker import TextChunk, chunk_text
from app.ingestion.loader import load_documents
from app.retrieval.retriever import InMemoryRetriever


def ingest_directory(directory: str, retriever: InMemoryRetriever, chunk_size: int = 800, overlap: int = 120) -> int:
    chunks: list[TextChunk] = []
    for document in load_documents(directory):
        chunks.extend(chunk_text(document["text"], document["source"], chunk_size, overlap))
    retriever.add(chunks)
    return len(chunks)
