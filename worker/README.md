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
- If you configure the `CHAT_LIMITS` KV binding, the Worker enforces
  `4` questions per IP per UTC day.

## Enable the daily limit with KV

1. Create a KV namespace:

```bash
npx wrangler kv namespace create CHAT_LIMITS
```

2. Copy the returned namespace id into `worker/wrangler.jsonc`:

```jsonc
"kv_namespaces": [
  {
    "binding": "CHAT_LIMITS",
    "id": "your-real-namespace-id"
  }
]
```

3. Redeploy the Worker:

```bash
npx wrangler deploy --config worker/wrangler.jsonc
```
