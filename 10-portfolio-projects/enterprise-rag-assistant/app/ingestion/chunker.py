from dataclasses import dataclass


@dataclass(frozen=True)
class TextChunk:
    text: str
    source: str
    chunk_id: int


def chunk_text(text: str, source: str, chunk_size: int = 800, overlap: int = 120) -> list[TextChunk]:
    """Split text into deterministic overlapping character chunks."""
    if chunk_size <= 0:
        raise ValueError("chunk_size must be greater than zero")
    if overlap < 0 or overlap >= chunk_size:
        raise ValueError("overlap must be >= 0 and smaller than chunk_size")

    cleaned = " ".join(text.split())
    if not cleaned:
        return []

    chunks: list[TextChunk] = []
    start = 0
    chunk_id = 0
    step = chunk_size - overlap

    while start < len(cleaned):
        end = min(start + chunk_size, len(cleaned))
        chunks.append(TextChunk(cleaned[start:end], source, chunk_id))
        chunk_id += 1
        if end == len(cleaned):
            break
        start += step

    return chunks
