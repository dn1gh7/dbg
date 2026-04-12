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
