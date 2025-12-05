import { useParams } from 'react-router';
import { EVENTS } from '../globlas';

export default function EventDetail() {
  const { eventId } = useParams();

  const event = EVENTS.find((e) => e.id === eventId);

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
      <p className="whitespace-pre-wrap break-words">{event.text}</p>
    </div>
  );
}
