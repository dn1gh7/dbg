export type StrapiEntity = Record<string, unknown> & {
  id?: number | string;
  documentId?: string;
  attributes?: Record<string, unknown>;
};

export function unwrapStrapiList(json: unknown): StrapiEntity[] {
  if (!json || typeof json !== 'object') return [];
  const data = (json as { data?: unknown }).data;
  if (data == null) return [];
  return Array.isArray(data) ? (data as StrapiEntity[]) : [data as StrapiEntity];
}

export function unwrapStrapiOne(json: unknown): StrapiEntity | null {
  const list = unwrapStrapiList(json);
  return list[0] ?? null;
}

/** Flatten Strapi v4 (id + attributes) or v5-style flat documents into one record. */
export function flattenEntity(entity: StrapiEntity): Record<string, unknown> {
  const attrs = entity.attributes;
  if (attrs && typeof attrs === 'object') {
    return { ...attrs, id: entity.id, documentId: entity.documentId };
  }
  return { ...entity };
}

export function entityId(entity: StrapiEntity): string {
  const flat = flattenEntity(entity);
  const docId = flat.documentId;
  if (typeof docId === 'string' && docId.length > 0) return docId;
  const id = flat.id ?? entity.id;
  return id != null ? String(id) : '';
}
