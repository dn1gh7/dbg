import { flattenEntity, type StrapiEntity } from './normalize';
import { mediaUrl } from './media';
import type { StrapiRichText } from './events';

/** One download/outbound button with an editor-supplied label. Shared by a Beitrag's
 * `files` list and by the `content.button-row` block. */
export type CmsFileLink = {
  label: string;
  href: string;
};

/**
 * One entry of a Strapi dynamic zone, discriminated by `__component`.
 *
 * The zone is what makes an entry's layout editor-controlled: paragraphs, images and
 * button rows render in whatever order they were arranged in the admin, instead of the
 * fixed description → gallery → PDFs sequence the fields alone can express.
 */
export type CmsBlock =
  | { kind: 'richText'; text: StrapiRichText }
  | { kind: 'image'; src: string; alt: string; caption?: string }
  | { kind: 'gallery'; images: string[]; caption?: string }
  | { kind: 'buttons'; buttons: CmsFileLink[] };

function asTrimmed(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/** Media entries carry their own `alternativeText`/`caption` in the media library.
 * Use the per-block field when set, so an editor can override for one usage without
 * changing the file everywhere it appears. */
function mediaMeta(media: unknown, key: string): string {
  if (!media || typeof media !== 'object') return '';
  const flat = flattenEntity(media as StrapiEntity);
  const direct = asTrimmed(flat[key]);
  if (direct) return direct;

  const wrapped = (flat as { data?: unknown }).data;
  if (wrapped && typeof wrapped === 'object') {
    return asTrimmed(flattenEntity(wrapped as StrapiEntity)[key]);
  }
  return '';
}

export function mapFileLinks(baseUrl: string, raw: unknown): CmsFileLink[] {
  if (!Array.isArray(raw)) return [];

  const links: CmsFileLink[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const f = flattenEntity(item as StrapiEntity);

    const label = asTrimmed(f.label);
    // Uploaded media wins; the `url` string is the fallback for documents that still
    // live in the site's own public/ folder rather than Strapi's media library.
    const href = mediaUrl(baseUrl, f.file) || asTrimmed(f.url);

    // A button with no label or no target is a half-filled row in the admin, not
    // something to render.
    if (label && href) links.push({ label, href });
  }
  return links;
}

function mapBlock(baseUrl: string, raw: unknown): CmsBlock | null {
  if (!raw || typeof raw !== 'object') return null;
  const f = flattenEntity(raw as StrapiEntity);
  const component = asTrimmed(f.__component);

  if (component === 'content.rich-text') {
    const text = (f.text ?? null) as StrapiRichText;
    return text ? { kind: 'richText', text } : null;
  }

  if (component === 'content.image') {
    const src = mediaUrl(baseUrl, f.image);
    if (!src) return null;
    return {
      kind: 'image',
      src,
      // Empty alt is correct for decoration; it is only wrong when unconsidered.
      alt: asTrimmed(f.alt) || mediaMeta(f.image, 'alternativeText'),
      caption: asTrimmed(f.caption) || mediaMeta(f.image, 'caption') || undefined,
    };
  }

  if (component === 'content.gallery') {
    const raws = Array.isArray(f.images) ? f.images : [];
    const images = raws.map((m) => mediaUrl(baseUrl, m)).filter((u) => u.length > 0);
    if (!images.length) return null;
    return { kind: 'gallery', images, caption: asTrimmed(f.caption) || undefined };
  }

  if (component === 'content.button-row') {
    const buttons = mapFileLinks(baseUrl, f.buttons);
    return buttons.length ? { kind: 'buttons', buttons } : null;
  }

  return null;
}

export function mapBlocks(baseUrl: string, raw: unknown): CmsBlock[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => mapBlock(baseUrl, entry))
    .filter((b): b is CmsBlock => b !== null);
}

/** Every component whose nested media needs naming in a populate query. */
export const BLOCK_POPULATE =
  'populate[body][on][content.image][populate]=*' +
  '&populate[body][on][content.gallery][populate]=*' +
  '&populate[body][on][content.button-row][populate][buttons][populate]=*' +
  '&populate[body][on][content.rich-text][populate]=*';
