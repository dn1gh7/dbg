import { useParams } from 'react-router';
import { useCmsEventDetail } from '../hooks/useCms';
import StrapiRichText from './strapiRichText';

export default function EventDetail() {
  const { eventId } = useParams();
  const { status, event } = useCmsEventDetail(eventId);

  if (status === 'loading') {
    return <p className="body-text">Laden…</p>;
  }

  if (!event) {
    return <p>Event nicht gefunden</p>;
  }

  return (
    <div className="body-text">
      <h1 className="heading">{event.title}</h1>
      <p>
        {new Date(event.startDate).toLocaleDateString('de-DE')}{' '}
        {event.endDate && (
          <span>- {new Date(event.endDate).toLocaleDateString('de-DE')}</span>
        )}
      </p>
      <StrapiRichText value={event.description} />
      {event.invitePdfPath && (
        <a
          className="bg-cambridge rounded-sm font-semibold hover:bg-periwinkleh transition:bg transition delay-50 duration-200 ease-in text-white inline-block p-3 my-5"
          href={event.invitePdfPath}
          target="_blank"
        >
          <span className="">Einladung herunterladen</span>
        </a>
      )}

      {event.programPdfPath && (
        <a
          className="bg-cambridge rounded-sm font-semibold hover:bg-periwinkleh transition:bg transition delay-50 duration-200 ease-in text-white inline-block p-3 my-5"
          href={event.programPdfPath}
          target="_blank"
        >
          <span className="">Programm herunterladen</span>
        </a>
      )}
    </div>
  );
}
