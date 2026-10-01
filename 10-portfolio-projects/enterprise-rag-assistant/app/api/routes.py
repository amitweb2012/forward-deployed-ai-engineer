from fastapi import APIRouter, HTTPException

from app.api.schemas import AskRequest, AskResponse
from app.rag.pipeline import RAGPipeline

router = APIRouter()
pipeline = RAGPipeline()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/ask", response_model=AskResponse)
def ask(request: AskRequest) -> AskResponse:
    try:
        result = pipeline.ask(request.question, request.top_k)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    return AskResponse(
        answer=result.answer,
        sources=result.sources,
        retrieved_chunks=result.retrieved_chunks,
    )
