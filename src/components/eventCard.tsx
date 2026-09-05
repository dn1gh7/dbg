import { Link } from 'react-router';
import type { CmsEvent } from '../lib/strapi/events';
import CardThumb from './cardThumb';

const dateFormat = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export function EventCard({ event }: { event: CmsEvent }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col overflow-hidden rounded-md border border-brand-200 bg-white
        transition-shadow hover:shadow-md
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    >
      <CardThumb src={event.cardImageUrl} />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-3 font-semibold leading-snug text-brand-900 group-hover:text-brand-700">
          {event.title}
        </h3>
        <p className="mt-auto text-sm text-ink-muted">
          <time dateTime={new Date(event.startDate).toISOString()}>
            {dateFormat.format(new Date(event.startDate))}
          </time>
          {event.endDate && (
            <>
              {' – '}
              <time dateTime={new Date(event.endDate).toISOString()}>
                {dateFormat.format(new Date(event.endDate))}
              </time>
            </>
          )}
        </p>
      </div>
    </Link>
  );
}
