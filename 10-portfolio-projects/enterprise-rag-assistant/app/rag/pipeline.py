from dataclasses import dataclass

from app.config.settings import settings
from app.generation.llm_service import GenerationResult, MockLLM
from app.generation.openai_service import OpenAILLM
from app.retrieval.retriever import InMemoryRetriever


@dataclass(frozen=True)
class RAGResponse:
    answer: str
    sources: list[str]
    retrieved_chunks: int


class RAGPipeline:
    def __init__(self, retriever: InMemoryRetriever | None = None, llm=None) -> None:
        self.retriever = retriever or InMemoryRetriever()
        if llm is not None:
            self.llm = llm
        elif settings.llm_provider.lower() == "openai":
            self.llm = OpenAILLM()
        else:
            self.llm = MockLLM()

    def ask(self, question: str, top_k: int | None = None) -> RAGResponse:
        question = question.strip()
        if not question:
            raise ValueError("question must not be empty")

        results = self.retriever.search(question, top_k or settings.top_k)
        contexts = [(result.chunk.source, result.chunk.text) for result in results]
        generated: GenerationResult = self.llm.generate(question, contexts)
        return RAGResponse(
            answer=generated.answer,
            sources=generated.sources,
            retrieved_chunks=len(results),
        )
