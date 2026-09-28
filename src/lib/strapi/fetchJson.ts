import { getStrapiBaseUrl } from './config';

export async function strapiFetchJson(
  apiPath: string,
  init?: RequestInit,
): Promise<unknown> {
  const base = getStrapiBaseUrl();
  const token = import.meta.env.VITE_STRAPI_API_TOKEN;
  const url = `${base}${apiPath.startsWith('/') ? apiPath : `/${apiPath}`}`;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...init, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Strapi request failed ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json() as Promise<unknown>;
}

/** Strapi's largest allowed page (`maxLimit` in cms/config/api.ts). */
const PAGE_SIZE = 100;

/**
 * Fetch every entry of a collection, following Strapi's pagination.
 *
 * A list request without explicit pagination returns only the first 25 entries
 * (`defaultLimit`), and says so only in `meta`, so past that point entries silently
 * disappear. Search and sorting run in the browser over the full list, so a partial
 * list would also mean silently missing results. Returns `{ data: [...] }` so the
 * existing response parsers work unchanged.
 */
export async function strapiFetchAll(
  apiPath: string,
  init?: RequestInit,
): Promise<{ data: unknown[] }> {
  const separator = apiPath.includes('?') ? '&' : '?';
  const data: unknown[] = [];

  for (let page = 1; ; page++) {
    const json = (await strapiFetchJson(
      `${apiPath}${separator}pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`,
      init,
    )) as { data?: unknown; meta?: { pagination?: { pageCount?: number } } };

    if (Array.isArray(json.data)) data.push(...json.data);

    const pageCount = json.meta?.pagination?.pageCount ?? 1;
    if (page >= pageCount) break;
  }

  return { data };
}
