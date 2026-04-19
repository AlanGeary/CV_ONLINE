# Cloudflare Worker

This Worker exposes `POST /api/chat` and connects the CV chat UI to Cloudflare Workers AI.

## Prerequisites

- A Cloudflare account
- Wrangler installed locally

## Suggested flow

1. Install Wrangler:

```bash
npm install -D wrangler
```

2. Authenticate:

```bash
npx wrangler login
```

3. Run the Worker locally:

```bash
npx wrangler dev --config worker/wrangler.jsonc
```

4. In another terminal, run the React app:

```bash
npm run dev
```

Vite proxies `/api/*` requests to the Worker during local development.

## Deploy

```bash
npx wrangler deploy --config worker/wrangler.jsonc
```

## Notes

- The Worker uses the `AI` binding as documented by Cloudflare Workers AI.
- The current model is `@cf/meta/llama-3.1-8b-instruct`.
- Responses are constrained to the CV context only.
