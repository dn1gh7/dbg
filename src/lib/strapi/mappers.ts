import type { PresidiumMember, SocietyEvent } from '../../globlas';
import type { Publication } from '../../components/publications1/publications';
import { mediaUrl } from './media';
import {
  entityId,
  flattenEntity,
  unwrapStrapiList,
  unwrapStrapiOne,
  type StrapiEntity,
} from './normalize';

function pickString(obj: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === 'string' && v.length > 0) return v;
  }
  return '';
}

function richTextNodeToText(node: unknown): string {
  if (!node || typeof node !== 'object') return '';
  const rec = node as Record<string, unknown>;
  const ownText = typeof rec.text === 'string' ? rec.text : '';
  const children = Array.isArray(rec.children) ? rec.children : [];
  const childText = children.map(richTextNodeToText).filter(Boolean).join('');
  const line = [ownText, childText].filter(Boolean).join('');
  return line;
}

function pickTextLike(obj: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === 'string' && v.trim().length > 0) return v;
    if (Array.isArray(v)) {
      const lines = v.map(richTextNodeToText).map((s) => s.trim()).filter(Boolean);
      if (lines.length) return lines.join('\n\n');
    }
  }
  return '';
}

function pickOptionalString(obj: Record<string, unknown>, keys: string[]): string | undefined {
  const s = pickString(obj, keys);
  return s || undefined;
}

function pickDateMs(obj: Record<string, unknown>, keys: string[]): number {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === 'string' && v.length > 0) {
      const t = Date.parse(v);
      if (!Number.isNaN(t)) return t;
    }
  }
  return 0;
}

export function mapStrapiEvent(baseUrl: string, entity: StrapiEntity): SocietyEvent {
  const f = flattenEntity(entity);
  const id = entityId(entity);
  const invite = mediaUrl(baseUrl, f.invitePdf ?? f.invite_pdf);
  const program = mediaUrl(baseUrl, f.programPdf ?? f.program_pdf);
  const cardImage = mediaUrl(baseUrl, f.cardImage ?? f.card_image);
  const imagesField = f.images ?? f.imageGallery ?? f.image_gallery;
  const imgPaths: string[] = [];
  if (Array.isArray(imagesField)) {
    for (const item of imagesField) {
      const u = mediaUrl(baseUrl, item);
      if (u) imgPaths.push(u);
    }
  } else {
    const u = mediaUrl(baseUrl, imagesField);
    if (u) imgPaths.push(u);
  }

  return {
    id,
    title: pickString(f, ['title']),
    text: pickTextLike(f, ['text', 'body', 'description']),
    imgPaths: imgPaths.length ? imgPaths : [''],
    invitePdfPath: invite,
    programPdfPath: program,
    startDate: pickDateMs(f, ['startDate', 'start_date']),
    endDate: (() => {
      const end = pickDateMs(f, ['endDate', 'end_date']);
      return end > 0 ? end : undefined;
    })(),
    cardImageUrl: cardImage || undefined,
  };
}

export function mapStrapiPresidiumMember(entity: StrapiEntity): PresidiumMember {
  const f = flattenEntity(entity);
  return {
    title: pickOptionalString(f, ['roleTitle', 'role_title', 'title']),
    name: pickString(f, ['name']),
  };
}

export function mapStrapiPublication(baseUrl: string, entity: StrapiEntity): Publication {
  const f = flattenEntity(entity);
  const cover = mediaUrl(baseUrl, f.coverImage ?? f.cover_image ?? f.image);
  return {
    title: pickString(f, ['title']),
    description: pickOptionalString(f, ['description', 'summary']),
    pdf_path: pickString(f, ['pdfExternal', 'pdf_external', 'externalUrl', 'external_url']),
    pdf_path1: mediaUrl(baseUrl, f.pdfVerzeichnis ?? f.pdf_verzeichnis ?? f.pdf_path1),
    pdf_path2: mediaUrl(baseUrl, f.pdfInfo ?? f.pdf_info ?? f.pdf_path2),
    img_path: cover || '/Cyril-methodius-small.jpg',
  };
}

export type LinkSection = { title: string; links: { text: string; ref: string }[] };

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
          ? ((row as { attributes: Record<string, unknown> }).attributes as Record<
              string,
              unknown
            >)
          : (row as Record<string, unknown>);
      const text = pickString(flat, ['text', 'label', 'title']);
      const ref = pickString(flat, ['ref', 'url', 'href', 'link']);
      if (text && ref) links.push({ text, ref });
    }
  }

  return { title, links };
}

export function parseEventsResponse(baseUrl: string, json: unknown): SocietyEvent[] {
  return unwrapStrapiList(json).map((e) => mapStrapiEvent(baseUrl, e));
}

export function parseEventOneResponse(baseUrl: string, json: unknown): SocietyEvent | null {
  const one = unwrapStrapiOne(json);
  return one ? mapStrapiEvent(baseUrl, one) : null;
}

export function parsePresidiumResponse(json: unknown): PresidiumMember[] {
  return unwrapStrapiList(json).map(mapStrapiPresidiumMember);
}

export function parsePublicationsResponse(baseUrl: string, json: unknown): Publication[] {
  return unwrapStrapiList(json).map((e) => mapStrapiPublication(baseUrl, e));
}

export function parseLinkSectionsResponse(json: unknown): LinkSection[] {
  return unwrapStrapiList(json).map(mapStrapiLinkSection);
}
