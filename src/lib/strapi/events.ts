import { flattenEntity, type StrapiEntity, unwrapStrapiList, unwrapStrapiOne, entityId } from './normalize';
import { mediaUrl } from './media';

export type StrapiRichText =
  | string
  | Array<Record<string, unknown>>
  | Record<string, unknown>
  | null;

export type CmsEvent = {
  id: string;
  title: string;
  description: StrapiRichText;
  startDate: number;
  endDate?: number;
  cardImageUrl?: string;
  imgPaths: string[];
  invitePdfPath: string;
  programPdfPath: string;
};

/** Strapi `date` fields arrive as bare YYYY-MM-DD, which Date.parse reads as UTC
 * midnight. Read those as *local* midnight instead, so an event dated today does not
 * land in the past for anyone east of UTC. Full datetimes keep their own offset. */
function parseDateMs(value: unknown): number {
  if (typeof value !== 'string' || value.length === 0) return 0;

  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (dateOnly) {
    const [, y, m, d] = dateOnly;
    return new Date(Number(y), Number(m) - 1, Number(d)).getTime();
  }

  const ts = Date.parse(value);
  return Number.isNaN(ts) ? 0 : ts;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/** Local midnight today — the cutoff between "Aktuell" and "Archiv". */
export function startOfToday(): number {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

/** An event counts as upcoming until the day it ends is over. */
export function isUpcoming(event: CmsEvent, cutoff = startOfToday()): boolean {
  return (event.endDate ?? event.startDate) >= cutoff;
}

function mapStrapiEvent(baseUrl: string, entity: StrapiEntity): CmsEvent {
  const f = flattenEntity(entity);
  const imagesField = f.images ?? f.imageGallery ?? f.image_gallery;
  const imgPaths: string[] = [];
  if (Array.isArray(imagesField)) {
    for (const item of imagesField) {
      const media = mediaUrl(baseUrl, item);
      if (media) imgPaths.push(media);
    }
  } else {
    const media = mediaUrl(baseUrl, imagesField);
    if (media) imgPaths.push(media);
  }

  const startDate = parseDateMs(f.startDate ?? f.start_date);
  const endDate = parseDateMs(f.endDate ?? f.end_date);

  return {
    id: entityId(entity),
    title: typeof f.title === 'string' ? f.title : '',
    description: (f.text ?? f.body ?? f.description ?? null) as StrapiRichText,
    startDate,
    endDate: endDate > 0 ? endDate : undefined,
    cardImageUrl: mediaUrl(baseUrl, f.cardImage ?? f.card_image) || undefined,
    imgPaths: imgPaths.length ? imgPaths : [''],
    // Uploaded media wins; the *Url string fields are the fallback for PDFs that still
    // live in the site's own public/ folder rather than Strapi's media library.
    invitePdfPath:
      mediaUrl(baseUrl, f.invitePdf ?? f.invite_pdf) || asString(f.invitePdfUrl),
    programPdfPath:
      mediaUrl(baseUrl, f.programPdf ?? f.program_pdf) || asString(f.programPdfUrl),
  };
}

export function parseEventsResponse(baseUrl: string, json: unknown): CmsEvent[] {
  return unwrapStrapiList(json).map((entity) => mapStrapiEvent(baseUrl, entity));
}

export function parseEventOneResponse(baseUrl: string, json: unknown): CmsEvent | null {
  const entity = unwrapStrapiOne(json);
  return entity ? mapStrapiEvent(baseUrl, entity) : null;
}
