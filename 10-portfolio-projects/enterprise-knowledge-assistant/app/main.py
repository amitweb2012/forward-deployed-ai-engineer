from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import router

app = FastAPI(title="Enterprise Knowledge Assistant", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)
app.include_router(router, prefix="/api/v1")


@app.get("/")
def root() -> dict[str, str]:
    return {"name": "Enterprise Knowledge Assistant", "docs": "/docs"}
