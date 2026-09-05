import { getStrapiBaseUrl } from './config';
import { strapiFetchJson } from './fetchJson';
import {
  parseLinkSectionsResponse,
  parsePresidiumResponse,
  parsePublicationsResponse,
} from './mappers';
import {
  parseEventOneResponse,
  parseEventsResponse,
  type CmsEvent,
} from './events';
import {
  parseArticleOneResponse,
  parseArticlesResponse,
  type CmsArticle,
} from './articles';
import { BLOCK_POPULATE } from './blocks';
import type { LinkSection } from './mappers';
import type { PresidiumMember } from '../../globals';
import type { Publication } from '../../components/publications/publications';

/** Strapi ignores a `populate=*` wildcard as soon as the query also names a structured
 * populate such as the dynamic zone's, and returns the entry with no relations at all.
 * Every media field therefore has to be listed by hand. */
const EVENT_POPULATE = 'populate[cardImage]=true&' + BLOCK_POPULATE;

export async function fetchCmsEvents(
  signal?: AbortSignal
): Promise<CmsEvent[]> {
  const base = getStrapiBaseUrl();
  const json = await strapiFetchJson(
    `/api/events?sort=startDate:desc&${EVENT_POPULATE}`,
    {
      signal,
    }
  );
  return parseEventsResponse(base, json);
}

export async function fetchCmsEventById(
  id: string,
  signal?: AbortSignal
): Promise<CmsEvent | null> {
  const base = getStrapiBaseUrl();
  const json = await strapiFetchJson(
    `/api/events/${encodeURIComponent(id)}?${EVENT_POPULATE}`,
    {
      signal,
    }
  );
  return parseEventOneResponse(base, json);
}

/** `populate=*` would return the `files` rows without the media inside them, so the
 * component's own relations are named explicitly. */
const ARTICLE_POPULATE = 'populate[cardImage]=true&' + BLOCK_POPULATE;

export async function fetchCmsArticles(
  signal?: AbortSignal
): Promise<CmsArticle[]> {
  const base = getStrapiBaseUrl();
  const json = await strapiFetchJson(
    `/api/articles?sort=sortOrder:asc&${ARTICLE_POPULATE}`,
    {
      signal,
    }
  );
  return parseArticlesResponse(base, json);
}

export async function fetchCmsArticleById(
  id: string,
  signal?: AbortSignal
): Promise<CmsArticle | null> {
  const base = getStrapiBaseUrl();
  const json = await strapiFetchJson(
    `/api/articles/${encodeURIComponent(id)}?${ARTICLE_POPULATE}`,
    {
      signal,
    }
  );
  return parseArticleOneResponse(base, json);
}

export async function fetchCmsPresidium(
  signal?: AbortSignal
): Promise<PresidiumMember[]> {
  const json = await strapiFetchJson(
    `/api/presidium-members?sort=sortOrder:asc&populate=*`,
    {
      signal,
    }
  );
  return parsePresidiumResponse(json);
}

export async function fetchCmsPublicationsByCategory(
  category: 'bulgarica' | 'bibliothek' | 'other',
  signal?: AbortSignal
): Promise<Publication[]> {
  const base = getStrapiBaseUrl();
  const json = await strapiFetchJson(
    `/api/publications?filters[category][$eq]=${encodeURIComponent(category)}&sort=sortOrder:asc&populate=*`,
    { signal }
  );
  return parsePublicationsResponse(base, json);
}

export async function fetchCmsHomePublications(
  signal?: AbortSignal
): Promise<Publication[]> {
  const base = getStrapiBaseUrl();
  const json = await strapiFetchJson(
    `/api/publications?filters[showOnHome][$eq]=true&sort=homeOrder:asc&populate=*`,
    { signal }
  );
  return parsePublicationsResponse(base, json);
}

export async function fetchCmsLinkSections(
  signal?: AbortSignal
): Promise<LinkSection[]> {
  const json = await strapiFetchJson(
    `/api/link-sections?sort=sortOrder:asc&populate[rows]=*`,
    { signal }
  );
  return parseLinkSectionsResponse(json);
}

export type { LinkSection } from './mappers';
export type { CmsEvent } from './events';
export type { CmsArticle } from './articles';
export type { CmsBlock, CmsFileLink } from './blocks';
