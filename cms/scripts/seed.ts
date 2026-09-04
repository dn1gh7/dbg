/**
 * Seeds the CMS with the content the site shipped before it had one.
 *
 *   npm run seed
 *
 * Idempotent per collection: any collection that already has entries is skipped, so
 * re-running never duplicates content and never overwrites editor changes. To re-seed a
 * collection, delete its entries in the admin first.
 */

import { compileStrapi, createStrapi } from '@strapi/strapi';
import {
  EVENTS,
  LINK_SECTIONS,
  PRESIDIUM,
  PUBLICATIONS,
} from './seed-data';

type TextNode = { type: 'text'; text: string };
type BlockNode = Record<string, unknown> & { type: string };

/** Convert the plain-text seed descriptions into Strapi's `blocks` format. Blank lines
 * separate paragraphs; runs of "- " lines become an unordered list.
 *
 * The nesting matters: a list block holds `list-item` children, each of which holds the
 * text nodes. Putting text directly under the list renders as <ul><span> — see
 * src/components/strapiRichText.tsx — and the admin's editor cannot open it. */
function textToBlocks(text: string): BlockNode[] {
  const blocks: BlockNode[] = [];
  const paragraphs = text
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  for (const paragraph of paragraphs) {
    const lines = paragraph.split('\n').map((l) => l.trim());
    const isList = lines.length > 0 && lines.every((l) => l.startsWith('- '));

    if (isList) {
      blocks.push({
        type: 'list',
        format: 'unordered',
        children: lines.map((l) => ({
          type: 'list-item',
          children: [{ type: 'text', text: l.slice(2) } as TextNode],
        })),
      });
    } else {
      blocks.push({
        type: 'paragraph',
        children: [{ type: 'text', text: lines.join(' ') } as TextNode],
      });
    }
  }

  return blocks;
}

async function seedCollection<T>(
  app: any,
  uid: string,
  items: T[],
  toData: (item: T) => Record<string, unknown>,
): Promise<void> {
  const existing = await app.documents(uid).count({});

  if (existing > 0) {
    console.log(`· ${uid}: ${existing} entries already present, skipping`);
    return;
  }

  for (const item of items) {
    await app.documents(uid).create({
      data: toData(item),
      status: 'published',
    });
  }

  console.log(`✓ ${uid}: created ${items.length} entries`);
}

async function main(): Promise<void> {
  const app = await createStrapi(await compileStrapi()).load();

  try {
    await seedCollection(app, 'api::event.event', EVENTS, (e) => ({
      title: e.title,
      description: e.description ? textToBlocks(e.description) : undefined,
      startDate: e.startDate,
      endDate: e.endDate,
      invitePdfUrl: e.invitePdfUrl,
      programPdfUrl: e.programPdfUrl,
    }));

    await seedCollection(
      app,
      'api::presidium-member.presidium-member',
      PRESIDIUM,
      (m) => ({ name: m.name, roleTitle: m.roleTitle, sortOrder: m.sortOrder }),
    );

    await seedCollection(app, 'api::publication.publication', PUBLICATIONS, (p) => ({
      title: p.title,
      description: p.description,
      category: p.category,
      sortOrder: p.sortOrder,
      coverImageUrl: p.coverImageUrl,
      pdfVerzeichnisUrl: p.pdfVerzeichnisUrl,
      pdfInfoUrl: p.pdfInfoUrl,
      pdfExternal: p.pdfExternal,
      showOnHome: p.showOnHome ?? false,
      homeOrder: p.homeOrder ?? 0,
    }));

    await seedCollection(app, 'api::link-section.link-section', LINK_SECTIONS, (s) => ({
      title: s.title,
      sortOrder: s.sortOrder,
      rows: s.rows,
    }));

    console.log(
      '\nDone. Remember to grant the Public role find/findOne on these types:\n' +
        '  Settings → Users & Permissions → Roles → Public',
    );
  } finally {
    await app.destroy();
  }
}

main().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
