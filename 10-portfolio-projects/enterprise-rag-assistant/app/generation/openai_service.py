from openai import OpenAI

from app.config.settings import settings
from app.generation.llm_service import GenerationResult


class OpenAILLM:
    """OpenAI-backed generation adapter.

    The API key is read from the server-side environment and is never exposed
    to the Next.js browser application.
    """

    def __init__(self) -> None:
        if not settings.openai_api_key:
            raise RuntimeError("OPENAI_API_KEY is not configured")
        self.client = OpenAI(api_key=settings.openai_api_key)

    def generate(self, question: str, contexts: list[tuple[str, str]]) -> GenerationResult:
        if not contexts:
            return GenerationResult(
                answer="I don't have enough information in the indexed knowledge base to answer that.",
                sources=[],
            )

        context = "\n\n".join(
            f"SOURCE: {source}\nCONTENT: {text}" for source, text in contexts
        )
        response = self.client.responses.create(
            model=settings.model_name,
            instructions=(
                "You are an enterprise knowledge assistant. Answer only from the provided "
                "context. If the context does not contain enough evidence, say so. "
                "Do not invent enterprise facts."
            ),
            input=f"CONTEXT:\n{context}\n\nQUESTION:\n{question}",
        )
        return GenerationResult(
            answer=response.output_text,
            sources=[source for source, _ in contexts],
        )
