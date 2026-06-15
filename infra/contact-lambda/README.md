# Contact form backend — Lambda + SES

Receives the contact form `POST`, validates it, and emails the lead to you via Amazon SES.
The frontend posts to `/api/contact`, which CloudFront routes to API Gateway → this Lambda.

```
Browser ──POST /api/contact──▶ CloudFront ──▶ API Gateway (HTTP API) ──▶ Lambda ──▶ SES ──▶ your inbox
```

## Environment variables (set on the Lambda)

| Variable                | Example                      | Notes                                            |
| ----------------------- | ---------------------------- | ------------------------------------------------ |
| `CONTACT_TO_ADDRESS`    | `hello@orangeneptune.com`    | Where leads are delivered.                       |
| `CONTACT_FROM_ADDRESS`  | `no-reply@orangeneptune.com` | Must be an **SES-verified** identity/domain.     |
| `ALLOW_ORIGIN`          | `https://orangeneptune.com`  | Your site origin (CORS). Use `*` only for tests. |
| `SES_REGION`            | `ap-northeast-1`             | Optional. Defaults to the Lambda's region.       |

## One-time setup

### 1. Verify a sender in SES
- SES console → **Verified identities** → verify your domain (recommended) or the `CONTACT_FROM_ADDRESS` email.
- If your SES account is still in **sandbox**, also verify `CONTACT_TO_ADDRESS`, or request production access.
- **Verify in the same region as the Lambda (`ap-northeast-1`)** — the function calls SES in its own region by default. (Or verify elsewhere and set `SES_REGION` to point at it.)

### 2. Create the Lambda (first time only)
The `create.sh` script creates the IAM role (logging + `ses:SendEmail`) **and** the function in one go.
Run it **once**; after that, code updates go through `npm run deploy`.

```bash
cd infra/contact-lambda
CONTACT_TO_ADDRESS=hello@orangeneptune.com \
CONTACT_FROM_ADDRESS=no-reply@orangeneptune.com \
ALLOW_ORIGIN=https://orangeneptune.com \
./create.sh
```

> `npm run deploy` calls `update-function-code`, which only works once the function exists.
> If you see `ResourceNotFoundException: Function not found`, you haven't run `create.sh` yet.

### 3. Expose it via API Gateway (HTTP API)
- API Gateway → **Create HTTP API** → add integration to the Lambda.
- Route: `POST /api/contact` → the Lambda. (Payload format **2.0**.)
- Note the invoke URL, e.g. `https://abc123.execute-api.ap-northeast-1.amazonaws.com`.

### 4. Route `/api/*` through CloudFront (recommended — keeps it same-origin)
On the existing distribution (`E2EIVW02496CGG`):
- Add an **origin** pointing at the API Gateway domain (`abc123.execute-api.ap-northeast-1.amazonaws.com`).
- Add a **behavior**: path pattern `/api/*` → that origin.
  - Viewer protocol: redirect to HTTPS.
  - Allowed methods: `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`.
  - Cache policy: **CachingDisabled**.
  - Origin request policy: **AllViewerExceptHostHeader**.
- Invalidate `/api/*` (or `/*`).

With this, the frontend's default `/api/contact` works with no env var and there's no CORS preflight (same origin).

### Alternative: skip CloudFront, point straight at API Gateway
Set the invoke URL at build time and CORS will apply:
```bash
VITE_CONTACT_ENDPOINT="https://abc123.execute-api.ap-northeast-1.amazonaws.com/api/contact" npm run build
```
Make sure `ALLOW_ORIGIN` on the Lambda matches your site origin.

## Updating the code later
```bash
cd infra/contact-lambda
npm run deploy   # re-zips and pushes to the orange-neptune-contact function
```

## Note on visitors in China
API Gateway / CloudFront are overseas endpoints — generally reachable from mainland China but
sometimes slow or intermittent (the same constraint already applies to the site itself without an
ICP filing). If China reliability becomes a priority, consider fronting the form with a
China-region service. The frontend already degrades gracefully: on failure it shows an error and
prompts the visitor to email `CONTACT_TO_ADDRESS` directly.
