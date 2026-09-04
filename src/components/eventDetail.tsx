import { Link, useParams } from 'react-router';
import { useCmsEventDetail } from '../hooks/useCms';
import EventGallery from './eventGallery';
import StrapiRichText from './strapiRichText';

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

  // mapStrapiEvent pads imgPaths with a single '' when an event has no gallery.
  const images = event.imgPaths.filter((p) => p.length > 0);

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

        <div className="mt-6 space-y-4">
          <StrapiRichText value={event.description} />
        </div>
      </div>

      {images.length > 0 && (
        <div className="mt-8">
          <EventGallery images={images} title={event.title} />
        </div>
      )}

      {(event.invitePdfPath || event.programPdfPath) && (
        <div className="measure mx-auto mt-8 flex flex-wrap gap-3">
          {event.invitePdfPath && (
            <a className="btn-primary" href={event.invitePdfPath} target="_blank">
              Einladung herunterladen
            </a>
          )}
          {event.programPdfPath && (
            <a className="btn-primary" href={event.programPdfPath} target="_blank">
              Programm herunterladen
            </a>
          )}
        </div>
      )}
    </article>
  );
}
