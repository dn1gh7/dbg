/** Resolve Strapi v4 ({ data: { attributes } }) or v5 / flat { url } media payloads to an absolute URL. */
export function mediaUrl(baseUrl: string, media: unknown): string {
  if (!media) return '';
  if (typeof media === 'string') return media;

  if (typeof media === 'object' && media !== null && 'url' in media) {
    const url = (media as { url?: string }).url;
    if (typeof url === 'string' && url.length > 0) {
      return url.startsWith('http') ? url : `${baseUrl}${url}`;
    }
  }

  const wrapped = media as {
    data?: { attributes?: { url?: string }; url?: string } | null;
  };
  const inner = wrapped.data;
  if (!inner) return '';

  const url =
    typeof inner === 'object' && inner !== null && 'attributes' in inner
      ? inner.attributes?.url
      : (inner as { url?: string }).url;

  if (typeof url !== 'string' || !url.length) return '';
  return url.startsWith('http') ? url : `${baseUrl}${url}`;
}
