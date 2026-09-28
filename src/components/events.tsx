import { useMemo } from 'react';
import { EventCard } from './eventCard';
import { useCmsEvents } from '../hooks/useCms';
import { isUpcoming, startOfToday, type CmsEvent } from '../lib/strapi/events';
import { SearchField, ShowMoreButton, SortSelect } from './listControls';
import {
  matchesQuery,
  sortItems,
  useListParams,
  useShowMore,
} from '../lib/listFilters';

export default function Events() {
  const { data: events } = useCmsEvents();
  const { query, sort, setQuery, setSort } = useListParams();

  // The search applies to both sections; the sort order only to the archive. "Aktuell"
  // always lists the next event first, since reversing it would put the most distant
  // one on top.
  const { current, archive } = useMemo(() => {
    const cutoff = startOfToday();
    const current: CmsEvent[] = [];
    const archive: CmsEvent[] = [];

    events.forEach((event) => {
      if (!matchesQuery(event.title, query)) return;
      if (isUpcoming(event, cutoff)) {
        current.push(event);
      } else {
        archive.push(event);
      }
    });

    current.sort((a, b) => a.startDate - b.startDate);

    return { current, archive: sortItems(archive, sort, (e) => e.startDate) };
  }, [events, query, sort]);

  const { visible, hasMore, showMore } = useShowMore(archive, `${query}|${sort}`);
  const searching = query.trim() !== '';

  return (
    <div className="body-text">
      <SearchField
        value={query}
        onChange={setQuery}
        label="Veranstaltungen durchsuchen"
      />

      <h2 className="section-heading">Aktuell</h2>
      {current.length === 0 ? (
        <p className="text-ink-muted">
          {searching
            ? 'Keine aktuellen Veranstaltungen zu dieser Suche.'
            : 'Zurzeit sind keine Veranstaltungen angekündigt.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {current.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      <div className="section-heading flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="subheading">Archiv</h2>
        <SortSelect value={sort} onChange={setSort} label="Archiv sortieren" hideLabel />
      </div>
      {archive.length === 0 ? (
        <p className="text-ink-muted">
          {searching
            ? 'Keine vergangenen Veranstaltungen zu dieser Suche.'
            : 'Noch keine vergangenen Veranstaltungen.'}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {visible.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {hasMore && (
            <ShowMoreButton
              onClick={showMore}
              remaining={archive.length - visible.length}
            />
          )}
        </>
      )}
    </div>
  );
}
