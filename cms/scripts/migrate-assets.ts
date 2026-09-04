/**
 * Moves the assets that still live in the site's `public/` folder into Strapi's media
 * library, so the CMS owns the content outright.
 *
 *   ASSET_DIR=/tmp/site-public npm run migrate:assets
 *
 * The seed creates entries that point at files shipped with the frontend — e.g. a
 * publication whose `coverImageUrl` is `/publications/9783954771769_g.jpg`, served by
 * nginx out of the built site. That works, but it means an editor cannot replace a
 * cover without a developer committing a file and rebuilding the image. This script
 * uploads each of those files and repoints the entry at the upload.
 *
 * For every `<name>Url` string field it uploads the file and fills the matching media
 * field, then clears the string. `src/lib/strapi/*` already prefers media over the
 * string, so an interrupted run leaves the site working either way.
 *
 * Idempotent: an entry whose media field is already set is skipped, so re-running does
 * not duplicate uploads. Values that are not site-relative paths (external URLs, typos)
 * are left untouched and listed at the end.
 *
 * ASSET_DIR is the site's `public/` folder as seen from inside the container. The
 * frontend is not mounted there, so copy it in first:
 *
 *   docker cp public/. dbg-strapi:/tmp/site-public/
 */

import fs from 'fs';
import path from 'path';
import { compileStrapi, createStrapi } from '@strapi/strapi';

const ASSET_DIR = process.env.ASSET_DIR ?? '/tmp/site-public';

/** `[string field, media field]` pairs, per collection. */
const MIGRATIONS: { uid: string; pairs: [string, string][] }[] = [
  {
    uid: 'api::event.event',
    pairs: [
      ['invitePdfUrl', 'invitePdf'],
      ['programPdfUrl', 'programPdf'],
    ],
  },
  {
    uid: 'api::publication.publication',
    pairs: [
      ['coverImageUrl', 'coverImage'],
      ['pdfVerzeichnisUrl', 'pdfVerzeichnis'],
      ['pdfInfoUrl', 'pdfInfo'],
    ],
  },
];

const MIME_TYPES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

const skipped: string[] = [];

/** Resolve a site-relative path like `/publications/cover.jpg` to a file on disk.
 *  Anything else — an external URL, or a value someone typed by hand — is not ours to
 *  migrate. */
function resolveAsset(value: string): string | null {
  if (!value.startsWith('/')) return null;

  // Seed values are written as plain paths, but a value copied out of a browser may be
  // percent-encoded; on disk the names have real spaces and umlauts.
  const candidates = [value, decodeURIComponent(value)];

  for (const candidate of candidates) {
    const file = path.join(ASSET_DIR, candidate);
    if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  }

  return null;
}

async function uploadOnce(
  app: any,
  cache: Map<string, number>,
  file: string
): Promise<number> {
  const cached = cache.get(file);
  if (cached !== undefined) return cached;

  const stat = fs.statSync(file);
  const name = path.basename(file);
  const mimetype = MIME_TYPES[path.extname(file).toLowerCase()];

  if (!mimetype) throw new Error(`unknown file type: ${name}`);

  const [uploaded] = await app
    .plugin('upload')
    .service('upload')
    .upload({
      data: {},
      files: [
        {
          filepath: file,
          originalFilename: name,
          mimetype,
          size: stat.size,
        },
      ],
    });

  cache.set(file, uploaded.id);
  console.log(`  ↑ ${name} (${Math.round(stat.size / 1024)} KB)`);
  return uploaded.id;
}

async function main(): Promise<void> {
  if (!fs.existsSync(ASSET_DIR)) {
    console.error(
      `Asset directory ${ASSET_DIR} not found.\n` +
        `Copy the site's public/ folder into the container first:\n` +
        `  docker cp public/. dbg-strapi:/tmp/site-public/`
    );
    process.exit(1);
  }

  // `any` for the same reason seed.ts uses it: the documents API is typed per content
  // type UID, and these are iterated as plain strings.
  const app: any = await createStrapi(await compileStrapi()).load();
  const cache = new Map<string, number>();
  let migrated = 0;

  try {
    for (const { uid, pairs } of MIGRATIONS) {
      const entries = await app.documents(uid).findMany({
        populate: pairs.map(([, mediaField]) => mediaField),
        status: 'published',
      });

      console.log(`\n${uid}: ${entries.length} entries`);

      for (const entry of entries) {
        const data: Record<string, unknown> = {};

        for (const [urlField, mediaField] of pairs) {
          const value = entry[urlField];

          if (entry[mediaField]) continue; // already migrated
          if (typeof value !== 'string' || value.length === 0) continue;

          const file = resolveAsset(value);
          if (!file) {
            skipped.push(`${entry.title} · ${urlField} = ${JSON.stringify(value)}`);
            continue;
          }

          data[mediaField] = await uploadOnce(app, cache, file);
          data[urlField] = null;
        }

        if (Object.keys(data).length === 0) continue;

        // Update writes the draft; publish mirrors it to the live version, which is
        // what the public API serves.
        await app.documents(uid).update({ documentId: entry.documentId, data });
        await app.documents(uid).publish({ documentId: entry.documentId });

        console.log(`  ✓ ${entry.title}`);
        migrated += 1;
      }
    }

    console.log(
      `\nDone. ${migrated} entries repointed at the media library, ` +
        `${cache.size} files uploaded.`
    );

    if (skipped.length > 0) {
      console.log(
        `\nLeft alone (not a site-relative path, or the file is missing) — ` +
          `check these by hand:`
      );
      for (const line of skipped) console.log(`  · ${line}`);
    }
  } finally {
    await app.destroy();
  }
}

main()
  // Exit explicitly. Shutting Strapi down cancels the upload plugin's own follow-up
  // queries, which otherwise surface as a Knex pool timeout after the work is already
  // committed — an alarming stack trace and a non-zero exit for a run that succeeded.
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Asset migration failed:', err);
    process.exit(1);
  });
