# Deployment runbook

How to put this site on a server and keep it running. For local development see
[README.md](README.md).

---

## What gets deployed

`docker-compose.prod.yaml` builds three containers from this repo:

| Service    | What it is                                              | Port   |
| ---------- | ------------------------------------------------------- | ------ |
| `web`      | nginx serving the built SPA (`Dockerfile` → `dist/`)     | 8080   |
| `strapi`   | `strapi start` against a pre-built admin panel           | 1337   |
| `postgres` | PostgreSQL 16                                            | (none) |

Nothing is bind-mounted — unlike the dev stack, both images are built from the repo.

Durable state lives in two named volumes. Compose prefixes them with the project name,
so on disk they are `dbg_dbg_strapi_pgdata` and `dbg_dbg_strapi_uploads`:

- `dbg_strapi_pgdata` — the database
- `dbg_strapi_uploads` — files uploaded through the admin's media library

**`docker compose down -v` destroys both.** Use `down` without `-v`.

### Where assets actually live

Everything the site displays is in the media library: the historical covers and PDFs
were moved there by [`npm run migrate:assets`](#migrating-assets-into-the-media-library),
and anything an editor adds lands in the same place. Media lives in the
`dbg_strapi_uploads` volume and is served from the **CMS** origin, which makes that
volume load-bearing — lose it and every cover and PDF 404s.

The same files are still in the frontend's `public/` folder and still in git. That is
deliberate, not leftovers: `src/globals.ts` and
`src/components/publications/publications_paths.ts` reference them as the static content
the site renders when Strapi is unreachable. Keep them — they are why an outage degrades
to a stale-but-complete page instead of an empty one.

The `…Url` string fields on `event` and `publication` are the bridge between the two
worlds. Uploaded media always wins for a given entry; the string is only read when the
media field is empty. Any entry still on a string is one the migration has not covered.

---

## Prerequisites

- Docker and the Compose plugin on the server
- A domain with two names pointing at it, e.g. `dbg.example.de` and `cms.example.de`
- A reverse proxy terminating TLS (see [TLS](#tls-and-the-reverse-proxy))

---

## Before the first deploy

### 1. Generate production secrets

Do **not** reuse the ones from your development checkout. Generate a fresh set:

```bash
openssl rand -base64 32
```

You need six values: `APP_KEYS` (four of them, comma-separated), `API_TOKEN_SALT`,
`ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`, plus a
`POSTGRES_PASSWORD`.

> **`ENCRYPTION_KEY` is not recoverable.** Change it later and existing encrypted
> values become unreadable. Store all of these in a password manager before you deploy —
> `.env` is gitignored, so the copy on the server is the only one that exists.

### 2. Write `.env` on the server

Copy [`.env.example`](.env.example) and fill it in. Three values must be
the **public origins the browser sees**, not container addresses:

```bash
STRAPI_PUBLIC_URL=https://cms.example.de     # uploaded-media URLs are built from this
STRAPI_CORS_ORIGINS=https://dbg.example.de   # the SITE's origin, not the CMS's
VITE_STRAPI_URL=https://cms.example.de       # baked into the frontend bundle
```

Compose auto-loads `.env` from the project directory, so no `--env-file` flag is needed.
Every secret in `docker-compose.prod.yaml` is guarded with `:?`, so Compose refuses to
start and names the missing variable rather than substituting an empty string. Verify
before starting anything:

```bash
docker compose -f docker-compose.prod.yaml config --quiet
```

---

## First deploy

**The order matters.** Strapi's `/admin` shows an open registration form until the first
admin exists — on a publicly reachable port, whoever finds it first becomes Super Admin.
Create the admin before opening the port.

```bash
# 1. Build and start. Keep 1337 unreachable from the internet for now
#    (bind to localhost in the compose file, or leave the firewall closed).
docker compose -f docker-compose.prod.yaml up --build -d

# 2. Wait for Strapi. First boot takes a few minutes; an empty response on 1337
#    means it is still starting, not that it failed. See Troubleshooting.
docker compose -f docker-compose.prod.yaml logs -f strapi

# 3. Create the admin user. This closes the open registration form.
docker compose -f docker-compose.prod.yaml exec strapi \
  npx strapi admin:create-user \
  --firstname=… --lastname=… --email=… --password=…
```

**4. Grant public read access.** In the admin, *Settings → Users & Permissions → Roles →
**Public*** → tick `find` **and** `findOne` for all four types:

- `event`
- `publication`
- `presidium-member`
- `link-section`

> Skipping this is the single most confusing failure in this project. The API returns
> 403, and the site **silently falls back** to the content compiled into `src/` with only
> a `[cms]` console warning. It looks like it is working.

**5. Load the content** — see [Bootstrapping content](#bootstrapping-content) below.
The import also restores the permissions from step 4.

**6. Open the ports** through the reverse proxy, then run the
[verification checklist](#verifying-a-deploy).

---

## Bootstrapping content

A fresh database is empty. Fill it by importing an export archive, so every entry ends
up pointing at files in the media library rather than at paths in the frontend bundle.

### Import an export archive

`strapi export` bundles entries, uploaded files, schema and configuration into one
archive. Produce it from an installation that is already correct — normally your local
dev stack:

```bash
docker compose exec strapi   npx strapi export --no-encrypt --file exports/dbg-content-$(date +%F)
```

The archive lands in `cms/exports/` on the host (bind-mounted in the dev stack). That
directory is gitignored — the archive contains the whole media library, so it is
deliberately not in the repo. Copy it to the server yourself:

```bash
scp cms/exports/dbg-content-2026-08-29.tar.gz server:~
```

On the server:

```bash
docker cp dbg-content-2026-08-29.tar.gz dbg-strapi:/srv/app/
docker compose -f docker-compose.prod.yaml exec strapi   npx strapi import -f dbg-content-2026-08-29.tar.gz --force
```

Three things to know before running it:

- **Import wipes the target** — entries, media and configuration are replaced, not
  merged. It is the right tool for a first deploy and for disaster recovery, and the
  wrong one for a site that already has content someone cares about.
- **The schema must match.** Import against a Strapi built from a different commit fails
  or silently drops fields. Export and import from the same revision of this repo.
- It **does** carry the `Public` role's `find`/`findOne` grants, so it undoes the usual
  403 trap for you. It does **not** carry admin panel users — create the admin first, as
  in [First deploy](#first-deploy).

### Migrating assets into the media library

Only needed when entries point at a file path in the frontend bundle instead of at an
upload — which happens if you add files to `public/` and reference them from a `…Url`
string field in the admin. The historical covers and PDFs were moved this way already,
and the export archive carries the result, so a normal deploy never runs this.

```bash
# 1. Copy the site's assets into the CMS container. The frontend is not mounted
#    there, so this is a plain file copy, not a volume.
docker cp public/. dbg-strapi:/tmp/site-public/

# 2. Upload them into the media library and repoint every entry at the upload.
docker compose -f docker-compose.prod.yaml exec   -e ASSET_DIR=/tmp/site-public strapi npm run migrate:assets
```

`npm run migrate:assets` is idempotent per field: an entry whose media field is already
set is left alone, so re-running it is safe and uploads nothing twice. For each
`…Url` string it uploads the file, fills the matching media field and clears the string.
It prints what it could not resolve — an external URL, a missing file, or a value someone
typed by hand — and leaves those entries untouched for you to fix in the admin.

Editors adding content through the admin panel upload straight into the media library,
which is the point — so this stays a rare maintenance step, not part of a deploy.

---

## TLS and the reverse proxy

`docker-compose.prod.yaml` publishes `1337:1337` and `8080:80` directly. **Do not leave
Strapi's admin on a public port over plain HTTP** — the login form would send credentials
in the clear.

Put a TLS-terminating proxy in front of both and change the published ports to bind to
localhost (`127.0.0.1:1337:1337`, `127.0.0.1:8080:80`) so only the proxy can reach them.
A minimal Caddyfile:

```caddy
dbg.example.de {
    reverse_proxy 127.0.0.1:8080
}

cms.example.de {
    reverse_proxy 127.0.0.1:1337
}
```

Both origins must be HTTPS. If the site is HTTPS and the CMS is not, uploaded media is
blocked as mixed content.

If you see wrong redirects or every request logged from the same IP, add `proxy: true`
to `cms/config/server.ts` so Koa trusts the `X-Forwarded-*` headers.

---

## Verifying a deploy

```bash
# All four must be 200, not 403 — 403 means step 4 was missed.
for t in events publications presidium-members link-sections; do
  printf '%-20s ' "$t"
  curl -s -o /dev/null -w '%{http_code}\n' https://cms.example.de/api/$t
done

# The site itself, including a deep link (tests the nginx try_files fallback).
curl -s -o /dev/null -w '%{http_code}\n' https://dbg.example.de/
curl -s -o /dev/null -w '%{http_code}\n' https://dbg.example.de/publications
```

Then in a browser: change an event title in the admin and reload the site. If nothing
changes, the site is serving its static fallback — check the console for `[cms]`
warnings and re-check the Public role.

---

## Backups

**A database dump alone is not a backup** — uploaded media lives outside Postgres.

```bash
# Database
docker compose -f docker-compose.prod.yaml exec -T postgres \
  pg_dump -U strapi strapi | gzip > dbg-db-$(date +%F).sql.gz

# Uploaded media
docker run --rm -v dbg_dbg_strapi_uploads:/u -v "$PWD:/out" alpine \
  tar czf /out/dbg-uploads-$(date +%F).tar.gz -C /u .
```

Back up `.env` separately, once — it is gitignored and not in any dump, and without
`ENCRYPTION_KEY` a restore is incomplete.

Strapi's own export bundles content, media and schema into one archive, which is better
for moving between environments — see
[Bootstrapping content](#bootstrapping-content) for the full round trip:

```bash
docker compose -f docker-compose.prod.yaml exec strapi npx strapi export --file backup
```

Without `--no-encrypt` the archive is encrypted with a key it prints once; keep that with
the archive or it is unreadable. Note that `strapi import` **wipes the target** and
requires a matching schema, so it is a migration and disaster-recovery tool, not
something to run against a live site casually.

### Restoring

```bash
gunzip -c dbg-db-2026-08-28.sql.gz | \
  docker compose -f docker-compose.prod.yaml exec -T postgres psql -U strapi -d strapi
```

Restore the uploads tarball into the volume, then restart Strapi.

---

## Routine operations

### Deploying a site change

```bash
git pull
docker compose -f docker-compose.prod.yaml up --build -d web
```

Content is untouched — it is in the database, not the image.

### Changing the CMS domain

`VITE_STRAPI_URL` is inlined into the bundle by Vite at **build** time. Editing
`.env` and restarting does nothing; the `web` image must be rebuilt:

```bash
docker compose -f docker-compose.prod.yaml up --build -d web
```

Update `STRAPI_PUBLIC_URL` and `STRAPI_CORS_ORIGINS` at the same time, and restart
`strapi` for those.

### Changing a content type

**The Content-Type Builder is disabled in production** — it writes `schema.json` files to
disk, which `strapi start` will not allow. So:

1. Make the change locally against the dev stack (`docker compose up`)
2. Commit the generated `cms/src/api/**/schema.json` and `cms/types/generated/`
3. `git pull` on the server and rebuild the `strapi` service

Field names are load-bearing: `src/lib/strapi/mappers.ts` and `src/lib/strapi/events.ts`
read them by name, so a rename breaks the mapping with only a `[cms]` console warning.

### Adding a content editor

Give the person responsible for content the **Editor** role, not Super Admin — it covers
creating, editing and publishing everything, while keeping them out of the schema
builder. *Settings → Administration Panel → Users → Invite new user*.

No email provider is configured, so Strapi will not send the invitation — it displays a
registration link for you to pass on. Same for forgotten passwords:

```bash
docker compose -f docker-compose.prod.yaml exec strapi \
  npx strapi admin:reset-user-password --email=… --password=…
```

One account per person: `created_by`/`updated_by` are recorded per entry, so a shared
login destroys the audit trail.

> Two separate role systems, easily confused. **Admin panel roles** (Super Admin /
> Editor / Author) control who can edit inside the CMS. **Users & Permissions roles**
> — where `Public` lives — control what the API serves anonymously. Making someone an
> Editor exposes nothing publicly; granting `Public` a `find` lets nobody log in.

---

## Troubleshooting

**Empty response / `NS_ERROR_NET_EMPTY_RESPONSE` on 1337.** Docker has bound the port but
Strapi is not listening yet — normal for the first few minutes while it rebuilds the
admin panel. Confirm it is alive with `docker top dbg-strapi`; you should see
`node .../strapi` burning CPU. Note `docker exec … ps` does **not** work: the
`node:20-bookworm-slim` image has no `ps` binary, so it fails silently and looks like
nothing is running.

**Site shows old content / CMS edits do not appear.** The static fallback is being
served. Check the browser console for `[cms]` warnings, then verify
`https://cms.example.de/api/publications` returns 200 rather than 403.

**Compose refuses to start, naming a variable.** A `:?`-guarded secret is missing from
`.env`. That is the guard working — add it.

**Strapi exits at boot with no useful error.** Usually a missing `ENCRYPTION_KEY`;
Strapi 5 will not start without one.

**Images or PDFs 404 after an editor uploads them.** `STRAPI_PUBLIC_URL` is wrong —
Strapi builds media URLs from it, so if it is set to an internal container address the
browser cannot resolve them.

**Everything looks right but the site is empty.** Confirm `VITE_STRAPI_URL` was actually
baked into the bundle: `docker compose -f docker-compose.prod.yaml exec web grep -ro
'cms\.example\.de' /usr/share/nginx/html/assets | head -1`. No match means the image was
built without the build arg.
