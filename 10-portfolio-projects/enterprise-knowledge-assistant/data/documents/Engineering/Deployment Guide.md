# Deployment Guide

## Release preparation
Create a pull request, ask a code owner for review, and wait for automated checks to pass. Include the change summary, risk, test evidence, and rollback plan.

## Deploy to production
Merge the approved change to the protected main branch. The continuous delivery system builds a versioned image, runs checks, and deploys the new revision to the test environment. After validation and approval, promote the same artifact to production.

## Validate
Check service health, error rate, latency, logs, and one critical user journey. Watch the service after release and record the release identifier in the change ticket.

## Rollback
If impact is detected, follow the Production Rollback Runbook. Do not bypass approvals or run unreviewed manual commands against production.
