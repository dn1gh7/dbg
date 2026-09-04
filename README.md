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
echo 'VITE_STRAPI_URL=http://localhost:1337' > .env.development.local   # or omit for static content
npm run dev                              # http://localhost:8080
```

Start the CMS alongside it:

```bash
cp .env.example .env.docker              # keep section 2, replace every secret
docker compose --env-file .env.docker up --build
docker compose exec strapi npm run seed  # first run only
```

## CREATING STRAPI SECRETS

openssl rand -base64 32

Strapi's admin is at http://localhost:1337/admin. After seeding, grant the **Public**
role `find` / `findOne` on all four content types under
_Settings → Users & Permissions → Roles → Public_, or the site gets 403s and falls back.

### Environment variables

Frontend (`.env.development.local`, or Docker build args in production):

| Variable                | Purpose                                                        |
| ----------------------- | -------------------------------------------------------------- |
| `VITE_STRAPI_URL`       | Strapi origin, no trailing slash. Unset ⇒ static content only. |
| `VITE_STRAPI_API_TOKEN` | Optional; only if the API is not publicly readable.            |

Vite inlines these at **build** time, so they end up in the bundle — never put a
write-capable token here. Note the file is `.env.development.local`, not `.env.local`:
Vite loads `.env.local` in production builds too, which is how `http://localhost:1337`
once got baked into a deployed bundle.

CMS secrets live in `.env.docker`. Every variable the project reads — frontend, Compose
and bare-metal Strapi — is documented in the single `.env.example`, which says per
section which file it belongs in.

## Content types

`strapi/content-types.json` documents the four collection types and their fields. The
field names are load-bearing — `src/lib/strapi/mappers.ts` and
`src/lib/strapi/events.ts` read them by name, so renaming a field in the admin breaks
the mapping silently (well, with a `[cms]` warning).

Assets can come from either place: upload a file to Strapi's media library, or point the
matching `…Url` string field at something already in `public/`. Uploaded media wins. The
seed uses the string fields, so `public/` remains the source of truth for the existing
PDFs and covers until they're moved into the media library.

## Deploying

**See [DEPLOYMENT.md](DEPLOYMENT.md) for the full runbook** — ordering, TLS, backups,
admin accounts and troubleshooting. The short version:

Both images build from this repo:

```bash
cp .env.example .env.docker               # keep section 2: secrets, STRAPI_PUBLIC_URL, VITE_STRAPI_URL
docker compose -f docker-compose.prod.yaml --env-file .env.docker up --build -d
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

In `cms/`: `npm run develop`, `npm run start`, `npm run build`, `npm run seed`.
