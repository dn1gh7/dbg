import type { PresidiumMember } from '../../globals';
import type {
  Publication,
  PublicationCategory,
} from '../../components/publications/publications';
import { mediaUrl } from './media';
import {
  flattenEntity,
  unwrapStrapiList,
  type StrapiEntity,
} from './normalize';

function pickString(obj: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === 'string' && v.length > 0) return v;
  }
  return '';
}

function pickOptionalString(
  obj: Record<string, unknown>,
  keys: string[]
): string | undefined {
  const s = pickString(obj, keys);
  return s || undefined;
}

export function mapStrapiPresidiumMember(
  entity: StrapiEntity
): PresidiumMember {
  const f = flattenEntity(entity);
  return {
    title: pickOptionalString(f, ['roleTitle', 'role_title', 'title']),
    name: pickString(f, ['name']),
  };
}

const PUBLICATION_CATEGORIES: PublicationCategory[] = [
  'bulgarica',
  'bibliothek',
  'forum',
];

function pickCategory(
  obj: Record<string, unknown>
): PublicationCategory | undefined {
  const raw = obj.category;
  return PUBLICATION_CATEGORIES.find((c) => c === raw);
}

export function mapStrapiPublication(
  baseUrl: string,
  entity: StrapiEntity
): Publication {
  const f = flattenEntity(entity);

  // Uploaded media wins; the *Url string fields are the fallback for assets that still
  // live in the site's own public/ folder rather than Strapi's media library.
  const cover =
    mediaUrl(baseUrl, f.coverImage ?? f.cover_image ?? f.image) ||
    pickString(f, ['coverImageUrl']);

  return {
    title: pickString(f, ['title']),
    description: pickOptionalString(f, ['description', 'summary']),
    category: pickCategory(f),
    pdf_path: pickString(f, [
      'pdfExternal',
      'pdf_external',
      'externalUrl',
      'external_url',
    ]),
    pdf_path1:
      mediaUrl(baseUrl, f.pdfVerzeichnis ?? f.pdf_verzeichnis ?? f.pdf_path1) ||
      pickString(f, ['pdfVerzeichnisUrl']),
    pdf_path2:
      mediaUrl(baseUrl, f.pdfInfo ?? f.pdf_info ?? f.pdf_path2) ||
      pickString(f, ['pdfInfoUrl']),
    img_path: cover || '/Cyril-methodius-small.jpg',
  };
}

export type LinkSection = {
  title: string;
  links: { text: string; ref: string }[];
};

function asRowArray(raw: unknown): unknown[] {
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === 'object' && 'data' in raw) {
    const d = (raw as { data: unknown }).data;
    if (Array.isArray(d)) return d;
  }
  return [];
}

export function mapStrapiLinkSection(entity: StrapiEntity): LinkSection {
  const f = flattenEntity(entity);
  const title = pickString(f, ['title', 'sectionTitle', 'section_title']);
  const rows = asRowArray(f.rows ?? f.links ?? f.entries);
  const links: { text: string; ref: string }[] = [];

  if (rows.length) {
    for (const row of rows) {
      if (!row || typeof row !== 'object') continue;
      const flat =
        'attributes' in row && (row as { attributes?: unknown }).attributes
          ? ((row as { attributes: Record<string, unknown> })
              .attributes as Record<string, unknown>)
          : (row as Record<string, unknown>);
      const text = pickString(flat, ['text', 'label', 'title']);
      const ref = pickString(flat, ['ref', 'url', 'href', 'link']);
      if (text && ref) links.push({ text, ref });
    }
  }

  return { title, links };
}

export function parsePresidiumResponse(json: unknown): PresidiumMember[] {
  return unwrapStrapiList(json).map(mapStrapiPresidiumMember);
}

export function parsePublicationsResponse(
  baseUrl: string,
  json: unknown
): Publication[] {
  return unwrapStrapiList(json).map((e) => mapStrapiPublication(baseUrl, e));
}

export function parseLinkSectionsResponse(json: unknown): LinkSection[] {
  return unwrapStrapiList(json).map(mapStrapiLinkSection);
}
