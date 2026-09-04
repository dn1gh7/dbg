/** Stable anchor id for a publication, derived from its title.
 *
 * Titles are the only field the CMS entries and the built-in fallback list share,
 * so they are what the home page and the publications page agree on when one
 * links to the other. */
export function publicationSlug(publication: { title: string }): string {
  return publication.title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
