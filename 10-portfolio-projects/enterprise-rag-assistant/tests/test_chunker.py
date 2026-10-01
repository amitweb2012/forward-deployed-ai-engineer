from app.ingestion.chunker import chunk_text


def test_chunk_text_creates_overlapping_chunks() -> None:
    text = "abcdefghijklmnopqrstuvwxyz"
    chunks = chunk_text(text, "sample.txt", chunk_size=10, overlap=2)

    assert len(chunks) == 3
    assert chunks[0].source == "sample.txt"
    assert chunks[0].chunk_id == 0
    assert chunks[1].chunk_id == 1
    assert chunks[0].text[-2:] == chunks[1].text[:2]
