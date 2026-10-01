# Enterprise RAG Assistant — Evaluation Plan

## Evaluation goals

The system should be evaluated at multiple layers.

### Retrieval

- Are relevant documents retrieved?
- Are irrelevant documents excluded?
- Does authorization affect the retrieval set correctly?

### Generation

- Is the answer supported by retrieved context?
- Is the answer relevant to the question?
- Does the system abstain when evidence is insufficient?

### Safety

- Prompt injection resistance
- Sensitive-data leakage tests
- Unauthorized retrieval tests
- Tool authorization tests

### Operations

- P50 / P95 latency
- Error rate
- Token usage
- Cost per query
- Retrieval and generation failures

## Example acceptance criteria

| Area | Example acceptance criterion |
|---|---|
| Grounding | Answers must be supported by retrieved evidence |
| Authorization | Unauthorized content must never enter model context |
| Abstention | Insufficient evidence must produce a controlled response |
| Reliability | Dependency failures must not cause fabricated answers |
| Observability | Request, retrieval, latency, and failure signals are traceable |

> The final numeric thresholds should be defined from the target use case rather than assumed globally.
