import { Link, useParams } from 'react-router';
import { useCmsEventDetail } from '../hooks/useCms';
import ContentBlocks from './contentBlocks';

const dateFormat = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

export default function EventDetail() {
  const { eventId } = useParams();
  const { status, event } = useCmsEventDetail(eventId);

  if (status === 'loading') {
    return <p className="measure mx-auto text-ink-muted">Laden…</p>;
  }

  if (!event) {
    return (
      <div className="measure mx-auto">
        <h1 className="heading">Veranstaltung nicht gefunden</h1>
        <Link className="btn-secondary mt-6" to="/events">
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  return (
    <article>
      <div className="measure mx-auto">
        <Link className="link-inline font-medium text-brand-700" to="/events">
          ← Veranstaltungen
        </Link>

        <h1 className="heading mt-3">{event.title}</h1>

        <p className="mt-2 font-medium text-brand-700">
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

      {/* Everything below the date comes from the blocks; an event with an empty
          `Inhalt` renders as just its heading and date. */}
      <ContentBlocks blocks={event.body} title={event.title} />
    </article>
  );
}
