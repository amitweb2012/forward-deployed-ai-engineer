from dataclasses import dataclass


@dataclass(frozen=True)
class GenerationResult:
    answer: str
    sources: list[str]


class MockLLM:
    """Safe local generator used for tests and demos without an API key."""

    def generate(self, question: str, contexts: list[tuple[str, str]]) -> GenerationResult:
        if not contexts:
            return GenerationResult(
                answer="I don't have enough information in the indexed knowledge base to answer that.",
                sources=[],
            )

        sources = [source for source, _ in contexts]
        snippets = [text[:300] for _, text in contexts[:3]]
        answer = (
            "Based on the retrieved knowledge base, the most relevant information is:\n\n"
            + "\n\n".join(f"- {snippet}" for snippet in snippets)
        )
        return GenerationResult(answer=answer, sources=sources)
