# Deutsch-Bulgarische Gesellschaft e. V. — website

The public site for the Deutsch-Bulgarische Gesellschaft: a React + Vite single-page app
(`src/`) backed by a Strapi 5 CMS (`cms/`) for events, publications, presidium members
and links.

The site works without the CMS. If `VITE_STRAPI_URL` is unset, or Strapi is unreachable,
every section falls back to the content checked into `src/` and logs a `[cms]` warning
explaining which endpoint failed.

## Running it locally

```bash
npm install
cp .env.example .env                     # then replace every secret
npm run dev                              # http://localhost:8080
```

Start the CMS alongside it:

```bash
docker compose up --build
```

## CREATING STRAPI SECRETS

openssl rand -base64 32

Strapi's admin is at http://localhost:1337/admin. Grant the **Public**
role `find` / `findOne` on all four content types under
_Settings → Users & Permissions → Roles → Public_, or the site gets 403s and falls back.

### Environment variables

Everything lives in a single gitignored `.env`, copied from `.env.example`. Docker
Compose and Vite both auto-load it, so no `--env-file` flag is needed anywhere.

Frontend:

| Variable                | Purpose                                                        |
| ----------------------- | -------------------------------------------------------------- |
| `VITE_STRAPI_URL`       | Strapi origin, no trailing slash. Unset ⇒ static content only. |
| `VITE_STRAPI_API_TOKEN` | Optional; only if the API is not publicly readable.            |

Vite inlines these at **build** time, so they end up in the bundle — never put a
write-capable token here. Vite loads `.env` in production builds too, so **change
`VITE_STRAPI_URL` before building for production**: a leftover `http://localhost:1337`
gets baked into the deployed bundle, which has happened before.

Sharing one file with Vite is safe for the secrets themselves: only `VITE_`-prefixed
variables are inlined into the bundle, and both `.dockerignore` files exclude `.env`.

Every variable the project reads is documented in `.env.example`.

## Content types

`strapi/content-types.json` documents the four collection types and their fields. The
field names are load-bearing — `src/lib/strapi/mappers.ts` and
`src/lib/strapi/events.ts` read them by name, so renaming a field in the admin breaks
the mapping silently (well, with a `[cms]` warning).

Assets can come from either place: upload a file to Strapi's media library, or point the
matching `…Url` string field at something already in `public/`. Uploaded media wins. The
existing PDFs and covers are already in the media library; `public/` keeps its copies as
the static fallback the site renders when Strapi is unreachable.

## Deploying

**See [DEPLOYMENT.md](DEPLOYMENT.md) for the full runbook** — ordering, TLS, backups,
admin accounts and troubleshooting. The short version:

Both images build from this repo:

```bash
cp .env.example .env                      # secrets, STRAPI_PUBLIC_URL, VITE_STRAPI_URL
docker compose -f docker-compose.prod.yaml up --build -d
```

- `web` — nginx serving the built SPA on port 8080. `docker/nginx.conf` has the
  `try_files` fallback that makes deep links like `/events/3` work.
- `strapi` — `strapi start` against a pre-built admin, Postgres, uploads on a named
  volume.

`VITE_STRAPI_URL` and `STRAPI_PUBLIC_URL` must both be the origins the **browser** sees,
not internal container addresses — Strapi builds uploaded-media URLs from
`STRAPI_PUBLIC_URL`, and the frontend prefixes relative media paths with
`VITE_STRAPI_URL`. `STRAPI_CORS_ORIGINS` must list the site's origin.

The site previously deployed to GitHub Pages with `HashRouter`; it now uses
`BrowserRouter`, and `index.html` carries a small shim that rewrites old `/#/…`
bookmarks to their new paths.

## Scripts

| Command           | What it does                                     |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Vite dev server on :8080, proxying `/strapi-api` |
| `npm run build`   | Typecheck (`tsc -b`) then build to `dist/`       |
| `npm run lint`    | ESLint                                           |
| `npm run preview` | Serve `dist/` locally                            |

| `npm run cms`      | Dev stack (Strapi + Postgres) via Compose        |
| `npm run cms:down` | Stop it                                          |
| `npm run cms:logs` | Follow Strapi's logs                             |
| `npm run prod:up`  | Production stack, detached                       |

Strapi runs in Docker only — the compose files inject its configuration, so there is no
`cms/.env`.
