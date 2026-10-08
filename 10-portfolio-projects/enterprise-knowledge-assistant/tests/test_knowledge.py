from app.knowledge import retrieve


def test_retrieval_finds_rollback_runbook():
    results = retrieve("How do I roll back a failed deployment?", top_k=4)
    assert results
    assert any("Rollback" in result[0].source for result in results)


def test_retrieval_finds_expense_policy():
    results = retrieve("What expenses need manager approval?", top_k=4)
    assert results
    assert any("Expense" in result[0].source for result in results)
