from pathlib import Path

from app.config.settings import settings
from app.ingestion.loader import load_documents
from app.ingestion.chunker import chunk_text


if __name__ == "__main__":
    data_dir = Path(__file__).resolve().parents[1] / "data" / "documents"
    documents = load_documents(str(data_dir))
    total = sum(len(chunk_text(doc["text"], doc["source"], settings.chunk_size, settings.chunk_overlap)) for doc in documents)
    print(f"Loaded documents: {len(documents)}")
    print(f"Generated chunks: {total}")
