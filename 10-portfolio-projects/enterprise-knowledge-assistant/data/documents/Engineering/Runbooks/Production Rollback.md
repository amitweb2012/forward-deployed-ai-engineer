# Production Rollback Runbook

## When to use
Use this runbook when a new production release causes elevated errors, failing health checks, or a material latency increase.

## Steps
1. Confirm the incident with the service dashboard and recent error-rate metrics.
2. Announce the incident in the engineering channel and assign an incident lead.
3. Pause any automated rollout that is still in progress.
4. Identify the last known-good application revision from the deployment history.
5. Use the approved deployment tool to roll back to that revision. Do not make manual changes outside the change process.
6. Verify readiness and liveness checks, error rate, latency, and a critical end-to-end user flow.
7. Record the release version, timestamps, observed impact, and actions taken in the incident ticket.
8. Keep the incident open until service owners confirm recovery and follow-up actions are assigned.

## Safety notes
A rollback may not reverse database migrations or external side effects. Contact the service owner before reversing schema changes. If rollback fails, escalate to the on-call lead.

## Completion criteria
The service is healthy, the error rate returns to the normal range, and the incident timeline is documented.
