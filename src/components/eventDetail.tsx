import { useParams } from 'react-router';
import { EVENTS } from '../globlas';

export default function EventDetail() {
  const { eventId } = useParams();

  const event = EVENTS.find((e) => e.id === eventId);

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="body-text">
      <h1 className="heading">{event.title}</h1>
      <p>Datum: {event.startDate.toLocaleDateString('de-DE')}</p>
      <p>{event.text}</p>
    </div>
  );
}
