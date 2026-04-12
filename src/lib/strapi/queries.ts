import { getStrapiBaseUrl } from './config';
import { strapiFetchJson } from './fetchJson';
import {
  parseEventOneResponse,
  parseEventsResponse,
  parseLinkSectionsResponse,
  parsePresidiumResponse,
  parsePublicationsResponse,
} from './mappers';
import type { LinkSection } from './mappers';
import type { PresidiumMember, SocietyEvent } from '../../globlas';
import type { Publication } from '../../components/publications1/publications';

export async function fetchCmsEvents(signal?: AbortSignal): Promise<SocietyEvent[]> {
  const base = getStrapiBaseUrl();
  const json = await strapiFetchJson(`/api/events?sort=startDate:desc&populate=*`, {
    signal,
  });
  return parseEventsResponse(base, json);
}

export async function fetchCmsEventById(
  id: string,
  signal?: AbortSignal,
): Promise<SocietyEvent | null> {
  const base = getStrapiBaseUrl();
  const json = await strapiFetchJson(`/api/events/${encodeURIComponent(id)}?populate=*`, {
    signal,
  });
  return parseEventOneResponse(base, json);
}

export async function fetchCmsPresidium(signal?: AbortSignal): Promise<PresidiumMember[]> {
  const json = await strapiFetchJson(`/api/presidium-members?sort=sortOrder:asc&populate=*`, {
    signal,
  });
  return parsePresidiumResponse(json);
}

export async function fetchCmsPublicationsByCategory(
  category: 'bulgarica' | 'bibliothek' | 'other',
  signal?: AbortSignal,
): Promise<Publication[]> {
  const base = getStrapiBaseUrl();
  const json = await strapiFetchJson(
    `/api/publications?filters[category][$eq]=${encodeURIComponent(category)}&sort=sortOrder:asc&populate=*`,
    { signal },
  );
  return parsePublicationsResponse(base, json);
}

export async function fetchCmsHomePublications(signal?: AbortSignal): Promise<Publication[]> {
  const base = getStrapiBaseUrl();
  const json = await strapiFetchJson(
    `/api/publications?filters[showOnHome][$eq]=true&sort=homeOrder:asc&populate=*`,
    { signal },
  );
  return parsePublicationsResponse(base, json);
}

export async function fetchCmsLinkSections(signal?: AbortSignal): Promise<LinkSection[]> {
  const json = await strapiFetchJson(
    `/api/link-sections?sort=sortOrder:asc&populate[rows]=*`,
    { signal },
  );
  return parseLinkSectionsResponse(json);
}

export type { LinkSection } from './mappers';
