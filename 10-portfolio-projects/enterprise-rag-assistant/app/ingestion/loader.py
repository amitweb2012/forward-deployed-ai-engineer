from pathlib import Path


SUPPORTED_EXTENSIONS = {".txt", ".md"}


def load_documents(directory: str) -> list[dict[str, str]]:
    """Load simple UTF-8 text/Markdown documents from a directory."""
    root = Path(directory)
    if not root.exists():
        return []

    documents: list[dict[str, str]] = []
    for path in sorted(root.rglob("*")):
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS:
            documents.append({"source": str(path), "text": path.read_text(encoding="utf-8")})
    return documents
