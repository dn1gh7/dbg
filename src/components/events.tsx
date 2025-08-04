import { useMemo } from 'react';
import { EVENTS } from '../globlas';
import { Event } from '../globlas';
import { EventCard } from './eventCard';

export default function Events() {
  const today = new Date();

  const { aktuell, archiv } = useMemo(() => {
    const aktuell: Event[] = [];
    const archiv: Event[] = [];

    EVENTS.forEach((event) => {
      const eventDate = new Date(event.startDate);
      if (eventDate >= today) {
        aktuell.push(event);
      } else {
        archiv.push(event);
      }
    });
    archiv.sort((a, b) => b.startDate - a.startDate);

    return { aktuell, archiv };
  }, [EVENTS]);

  return (
    <div className="body-text">
      <h2 className="subheading bg-cambridge p-1 text-white">Aktuell</h2>
      <div className="flex flex-col md:flex-row flex-wrap space-y-3 md:space-x-10 py-4">
        {aktuell.map((event, index) => EventCard(event, index))}
      </div>
      <h2 className="subheading bg-cambridge p-1 text-white">Archiv</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-5 gap-4  py-4">
        {archiv.map((event, index) => EventCard(event, index))}
      </div>
    </div>
  );
}
