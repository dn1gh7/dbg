import { useMemo } from 'react';
import { ArticleCard } from './articleCard';
import { useCmsArticles } from '../hooks/useCms';
import { SearchField, ShowMoreButton, SortSelect } from './listControls';
import {
  matchesQuery,
  sortItems,
  useListParams,
  useShowMore,
} from '../lib/listFilters';

export default function Articles() {
  const { data: articles } = useCmsArticles();
  const { query, sort, setQuery, setSort } = useListParams();

  // Beiträge have no date field of their own, so "neu/alt" goes by when the entry was
  // created in Strapi.
  const results = useMemo(
    () =>
      sortItems(
        articles.filter((a) => matchesQuery(a.title, query)),
        sort,
        (a) => a.createdAt
      ),
    [articles, query, sort]
  );

  const { visible, hasMore, showMore } = useShowMore(results, `${query}|${sort}`);

  if (articles.length === 0) {
    return (
      <div className="body-text">
        <p className="text-ink-muted">Zurzeit sind keine Beiträge veröffentlicht.</p>
      </div>
    );
  }

  return (
    <div className="body-text">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <SearchField value={query} onChange={setQuery} label="Beiträge durchsuchen" />
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {results.length === 0 ? (
        <p className="text-ink-muted">Keine Beiträge zu dieser Suche.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {visible.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          {hasMore && (
            <ShowMoreButton
              onClick={showMore}
              remaining={results.length - visible.length}
            />
          )}
        </>
      )}
    </div>
  );
}
