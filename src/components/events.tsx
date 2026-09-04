import { useMemo } from 'react';
import { EventCard } from './eventCard';
import { useCmsEvents } from '../hooks/useCms';
import { isUpcoming, startOfToday, type CmsEvent } from '../lib/strapi/events';

export default function Events() {
  const { data: events } = useCmsEvents();

  const { current, archive } = useMemo(() => {
    const cutoff = startOfToday();
    const current: CmsEvent[] = [];
    const archive: CmsEvent[] = [];

    events.forEach((event) => {
      if (isUpcoming(event, cutoff)) {
        current.push(event);
      } else {
        archive.push(event);
      }
    });

    current.sort((a, b) => a.startDate - b.startDate);
    archive.sort((a, b) => b.startDate - a.startDate);

    return { current, archive };
  }, [events]);

  return (
    <div className="body-text">
      <h2 className="section-heading">Aktuell</h2>
      {current.length === 0 ? (
        <p className="text-ink-muted">Zurzeit sind keine Termine angekündigt.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {current.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      <h2 className="section-heading">Archiv</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {archive.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
