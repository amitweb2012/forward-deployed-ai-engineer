# Service Health Runbook

## First checks
When a service appears unhealthy, check the health endpoint, recent deployment history, container restart count, application logs, dependency availability, and CPU/memory saturation.

## Triage sequence
1. Check whether the issue affects one instance or all instances.
2. Compare the time of the first alert with deploys and configuration changes.
3. Inspect structured logs using the correlation or request ID.
4. Check database connection-pool saturation and downstream API latency.
5. Review resource limits before changing them.
6. If customer impact is confirmed, open an incident and notify the on-call engineer.

## Escalation
Escalate persistent production errors to the service owner and incident lead. Avoid deleting data, restarting stateful systems, or changing production configuration without the approved procedure.

## Evidence to collect
Capture the alert name, start time, affected region, release version, error rate, p95 latency, representative request IDs, and relevant log excerpts.
