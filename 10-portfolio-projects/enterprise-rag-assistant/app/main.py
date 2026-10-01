from fastapi import FastAPI

from app.api.routes import router
from app.config.settings import settings

app = FastAPI(title=settings.app_name, version=settings.app_version)
app.include_router(router, prefix=settings.api_prefix)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "message": "Enterprise RAG Assistant is running",
    }
