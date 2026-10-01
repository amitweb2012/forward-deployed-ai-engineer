from dataclasses import dataclass

from app.embeddings.embedding_service import LocalHashEmbedding, cosine_similarity
from app.ingestion.chunker import TextChunk


@dataclass(frozen=True)
class SearchResult:
    chunk: TextChunk
    score: float


class InMemoryRetriever:
    def __init__(self, embedding_service: LocalHashEmbedding | None = None) -> None:
        self.embedding_service = embedding_service or LocalHashEmbedding()
        self._items: list[tuple[TextChunk, list[float]]] = []

    def add(self, chunks: list[TextChunk]) -> None:
        self._items.extend((chunk, self.embedding_service.embed(chunk.text)) for chunk in chunks)

    def search(self, query: str, top_k: int = 5) -> list[SearchResult]:
        query_vector = self.embedding_service.embed(query)
        results = [
            SearchResult(chunk, cosine_similarity(query_vector, vector))
            for chunk, vector in self._items
        ]
        return sorted(results, key=lambda item: item.score, reverse=True)[:top_k]
