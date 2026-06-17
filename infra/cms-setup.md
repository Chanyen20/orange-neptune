# CMS Setup — Sveltia + Cloudflare Worker (one-time)

The content editor lives at **`https://<your-domain>/admin`**. The client edits
articles and site text there; Sveltia commits the changes to this GitHub repo,
and the GitHub Action (`.github/workflows/deploy.yml`) rebuilds and deploys to S3.

There is **no database**. Content is stored as files:

- Articles → `content/articles/<locale>/<slug>.md`
- Site text → `content/site/<locale>.json`
- Uploaded images → `public/images/articles/`

You only need to do the four one-time steps below. After that, the client just
uses `/admin`.

---

## Step 1 — Create a GitHub OAuth App

1. Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**
   (https://github.com/settings/developers).
2. Fill in:
   - **Application name:** `Orange Neptune CMS`
   - **Homepage URL:** `https://<your-domain>`
   - **Authorization callback URL:** `https://<your-worker>.workers.dev/callback`
     (you'll get the worker URL in Step 2 — you can come back and edit this.)
3. Click **Register application**.
4. Copy the **Client ID**. Click **Generate a new client secret** and copy the
   **Client Secret** (shown once).

---

## Step 2 — Deploy the Cloudflare Worker (login helper)

This is the small, free "login handshake" service. Use the official one:
**https://github.com/sveltia/sveltia-cms-auth**

1. Create a free Cloudflare account (no credit card needed).
2. Easiest path — deploy from the dashboard:
   - Workers & Pages → Create → import the `sveltia-cms-auth` repo, **or** copy
     its `src/index.js` into a new Worker.
3. In the Worker's **Settings → Variables**, add:
   - `GITHUB_CLIENT_ID` = the Client ID from Step 1
   - `GITHUB_CLIENT_SECRET` = the Client Secret from Step 1 (mark as **Encrypted**)
   - `ALLOWED_DOMAINS` = `<your-domain>` (so only your site can use it)
4. Deploy. Copy the Worker URL, e.g. `https://orange-neptune-cms-auth.<acct>.workers.dev`.
5. Go back to the GitHub OAuth App (Step 1) and set the **callback URL** to
   `https://<that-worker-url>/callback`.

Then update **`public/admin/config.yml`** in this repo:

```yaml
backend:
  name: github
  repo: Chanyen20/orange-neptune
  branch: main
  base_url: https://<that-worker-url> # <-- replace the REPLACE-WITH... placeholder
```

Commit that change.

---

## Step 3 — Add AWS credentials as GitHub repo Secrets

So the GitHub Action can deploy to S3. In **GitHub repo → Settings → Secrets and
variables → Actions → New repository secret**, add:

| Secret name             | Value                                  |
| ----------------------- | -------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | an IAM access key id                    |
| `AWS_SECRET_ACCESS_KEY` | the matching secret                     |
| `AWS_REGION`            | the bucket's region, e.g. `us-east-1`   |

The IAM user needs only: `s3:ListBucket`, `s3:PutObject`, `s3:DeleteObject` on
`arn:aws:s3:::orange-neptune-web-prod` (and `/*`), plus
`cloudfront:CreateInvalidation` on the distribution `E2EIVW02496CGG`.

---

## Step 4 — Add the client as a repo collaborator

GitHub is what actually enforces who can publish (see the chat explanation).

1. **GitHub repo → Settings → Collaborators → Add people.**
2. Add the client's own GitHub account with the **Write** role (not Admin).

That's it. Anyone who isn't a collaborator can't change content, even if they
open `/admin`.

---

## How the client uses it (day-to-day)

1. Open `https://<your-domain>/admin`.
2. Click **Login with GitHub** (one-time authorize).
3. **Articles → New** → fill in English + 中文, upload a cover, **Publish**.
   Or **Site text** to edit the homepage / page headings.
4. ~1–2 minutes later (after the GitHub Action runs) the change is live.

---

## Notes

- `/admin` only works on the **deployed** site, not `npm run dev` (the dev server
  routes everything through the app). The CloudFront rewrite function already maps
  `/admin/` → `/admin/index.html`.
- New article images go to `public/images/articles/`; the existing seed articles
  reuse `/images/case-*.jpg`.
- The contact form's China reachability is a separate task (see chat).
