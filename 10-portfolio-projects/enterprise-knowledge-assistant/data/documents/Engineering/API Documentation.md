# Internal API Documentation

## Service base URL
The sample Order API is reachable inside the local network at `http://orders.internal/api/v1`. This is fictional documentation for this portfolio demo.

## Authentication
Production API requests should use a short-lived OAuth2 access token in the Authorization header as a Bearer token. Never embed secrets in browser code or commit tokens to source control.

## Create an order
`POST /orders` accepts a JSON payload containing `customer_id`, `items`, and `currency`. The API validates required fields and returns an order ID and initial status.

## Reliability guidelines
Clients should set connection and request timeouts, retry only safe or idempotent requests, use an idempotency key for order creation, and respect HTTP 429 responses. Request IDs should be included in support tickets.

## Error handling
The API may return 400 for invalid input, 401 for missing authentication, 403 for insufficient permission, 404 for unknown resources, 429 for rate limiting, and 5xx for server-side failures.
