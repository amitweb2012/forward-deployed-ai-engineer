from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Enterprise AI Knowledge Assistant"
    app_version: str = "0.2.0"
    environment: str = "local"
    api_prefix: str = "/api/v1"
    chunk_size: int = 800
    chunk_overlap: int = 120
    top_k: int = 5
    llm_provider: str = "openai"
    model_name: str = "gpt-5-mini"
    embedding_model: str = "text-embedding-3-small"
    openai_api_key: str | None = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


settings = Settings()
