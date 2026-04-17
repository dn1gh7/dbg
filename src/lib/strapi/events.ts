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

function parseDateMs(value: unknown): number {
  if (typeof value !== 'string' || value.length === 0) return 0;
  const ts = Date.parse(value);
  return Number.isNaN(ts) ? 0 : ts;
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
    invitePdfPath: mediaUrl(baseUrl, f.invitePdf ?? f.invite_pdf),
    programPdfPath: mediaUrl(baseUrl, f.programPdf ?? f.program_pdf),
  };
}

export function parseEventsResponse(baseUrl: string, json: unknown): CmsEvent[] {
  return unwrapStrapiList(json).map((entity) => mapStrapiEvent(baseUrl, entity));
}

export function parseEventOneResponse(baseUrl: string, json: unknown): CmsEvent | null {
  const entity = unwrapStrapiOne(json);
  return entity ? mapStrapiEvent(baseUrl, entity) : null;
}
