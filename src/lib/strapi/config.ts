/** Base URL of Strapi (no trailing slash). Example: https://cms.example.com or http://localhost:8080/strapi-api when using the Vite dev proxy. */
export function getStrapiBaseUrl(): string {
  return (import.meta.env.VITE_STRAPI_URL ?? '').replace(/\/$/, '');
}

export function isStrapiConfigured(): boolean {
  return getStrapiBaseUrl().length > 0;
}
