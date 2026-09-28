import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

export type SortKey = 'neu' | 'alt' | 'az';

export const SORT_LABELS: Record<SortKey, string> = {
  neu: 'Neueste zuerst',
  alt: 'Älteste zuerst',
  az: 'Alphabetisch (A–Z)',
};

const DEFAULT_SORT: SortKey = 'neu';

/** Lower-case and strip diacritics, so "svistov" finds "Svištov" and "uber" finds
 * "Über". */
function normalize(text: string): string {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

export function matchesQuery(title: string, query: string): boolean {
  const q = normalize(query.trim());
  return q === '' || normalize(title).includes(q);
}

const collator = new Intl.Collator('de', { sensitivity: 'base', numeric: true });

/** Sorts a copy of `items`; `date` supplies the value "neu"/"alt" compare. */
export function sortItems<T extends { title: string }>(
  items: T[],
  sort: SortKey,
  date: (item: T) => number
): T[] {
  const sorted = [...items];
  if (sort === 'az') sorted.sort((a, b) => collator.compare(a.title, b.title));
  else if (sort === 'alt') sorted.sort((a, b) => date(a) - date(b));
  else sorted.sort((a, b) => date(b) - date(a));
  return sorted;
}

/**
 * Search text and sort order, kept in the URL (`?q=donau&sort=alt`) so a filtered view
 * can be shared or bookmarked. The defaults are left out of the URL. Updates replace
 * the history entry rather than adding one per keystroke.
 */
export function useListParams() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const rawSort = params.get('sort');
  const sort: SortKey =
    rawSort === 'alt' || rawSort === 'az' ? rawSort : DEFAULT_SORT;

  const update = (key: 'q' | 'sort', value: string, fallback: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === fallback) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true }
    );

  return {
    query,
    sort,
    setQuery: (value: string) => update('q', value, ''),
    setSort: (value: SortKey) => update('sort', value, DEFAULT_SORT),
  };
}

const PAGE = 12;

/**
 * Shows the first 12 items and reveals 12 more per click. Starts over whenever
 * `resetKey` changes, so a new search does not open halfway down an old list.
 */
export function useShowMore<T>(items: T[], resetKey: string) {
  const [count, setCount] = useState(PAGE);
  useEffect(() => setCount(PAGE), [resetKey]);

  const visible = useMemo(() => items.slice(0, count), [items, count]);
  return {
    visible,
    hasMore: items.length > count,
    showMore: () => setCount((c) => c + PAGE),
  };
}
