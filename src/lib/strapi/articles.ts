import {
  type StrapiEntity,
  flattenEntity,
  unwrapStrapiList,
  unwrapStrapiOne,
  entityId,
} from './normalize';
import { mediaUrl } from './media';
import { mapBlocks, type CmsBlock } from './blocks';

/**
 * A Beitrag carries only what the overview card needs. Everything the detail page
 * renders — text, images, galleries, download buttons — lives in `body`, so an editor
 * decides both the content and its order rather than filling fixed fields.
 */
export type CmsArticle = {
  id: string;
  title: string;
  sortOrder: number;
  cardImageUrl?: string;
  body: CmsBlock[];
};

function mapStrapiArticle(baseUrl: string, entity: StrapiEntity): CmsArticle {
  const f = flattenEntity(entity);
  const sortOrder = Number(f.sortOrder);

  return {
    id: entityId(entity),
    title: typeof f.title === 'string' ? f.title : '',
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    cardImageUrl: mediaUrl(baseUrl, f.cardImage) || undefined,
    body: mapBlocks(baseUrl, f.body),
  };
}

export function parseArticlesResponse(
  baseUrl: string,
  json: unknown
): CmsArticle[] {
  return unwrapStrapiList(json).map((entity) =>
    mapStrapiArticle(baseUrl, entity)
  );
}

export function parseArticleOneResponse(
  baseUrl: string,
  json: unknown
): CmsArticle | null {
  const entity = unwrapStrapiOne(json);
  return entity ? mapStrapiArticle(baseUrl, entity) : null;
}
