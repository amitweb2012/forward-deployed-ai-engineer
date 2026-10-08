from dataclasses import dataclass
from pathlib import Path
import re

DATA_DIR = Path(__file__).resolve().parent.parent / "data" / "documents"


@dataclass(frozen=True)
class Passage:
    text: str
    source: str
    department: str


def _tokens(text: str) -> set[str]:
    return {word for word in re.findall(r"[a-z0-9]+", text.lower()) if len(word) > 2}


def load_passages() -> list[Passage]:
    """Load Markdown/text knowledge assets and split them into readable passages."""
    passages: list[Passage] = []
    if not DATA_DIR.exists():
        return passages
    for path in sorted(DATA_DIR.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in {".md", ".txt"}:
            continue
        relative = path.relative_to(DATA_DIR)
        department = relative.parts[0] if relative.parts else "General"
        content = path.read_text(encoding="utf-8")
        chunks = re.split(r"\n\s*\n", content)
        for chunk in chunks:
            cleaned = chunk.strip()
            if len(cleaned) >= 30:
                passages.append(Passage(cleaned, relative.as_posix(), department))
    return passages


def retrieve(question: str, top_k: int = 4) -> list[tuple[Passage, float]]:
    query_tokens = _tokens(question)
    if not query_tokens:
        return []
    scored: list[tuple[Passage, float]] = []
    for passage in load_passages():
        passage_tokens = _tokens(passage.text)
        overlap = len(query_tokens & passage_tokens)
        if overlap == 0:
            continue
        # Simple transparent baseline score. Upgrade to semantic embeddings later.
        score = overlap / max(len(query_tokens), 1)
        scored.append((passage, score))
    scored.sort(key=lambda row: row[1], reverse=True)
    return scored[:top_k]


def demo_answer(question: str, passages: list[tuple[Passage, float]]) -> str:
    if not passages:
        return (
            "I couldn't find a close match in the sample knowledge base. "
            "Try asking about production deployment, rollback, security incidents, "
            "passwords, expenses, or procurement."
        )
    excerpts = []
    for passage, _ in passages[:3]:
        snippet = re.sub(r"^#+\s*", "", passage.text).replace("\n", " ")
        if len(snippet) > 440:
            snippet = snippet[:437].rstrip() + "..."
        excerpts.append(f"• {snippet}")
    return (
        "Here is what I found in the sample company knowledge base. "
        "Please review the cited source for the full procedure.\n\n"
        + "\n\n".join(excerpts)
    )
