import { useMemo } from 'react';
import { SocietyEvent } from '../globlas';
import { EventCard } from './eventCard';
import { useCmsEvents } from '../hooks/useCms';

export default function Events() {
  const { data: events } = useCmsEvents();

  const { current, archive } = useMemo(() => {
    const today = new Date();
    const current: SocietyEvent[] = [];
    const archive: SocietyEvent[] = [];

    events.forEach((event) => {
      const eventDate = new Date(event.startDate);
      if (eventDate >= today) {
        current.push(event);
      } else {
        archive.push(event);
      }
    });
    archive.sort((a, b) => b.startDate - a.startDate);

    return { current, archive };
  }, [events]);

  return (
    <div className="body-text">
      <h2 className="subheading bg-cambridge p-1 text-white">Aktuell</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-5 gap-4  py-4">
        {current.map((event, index) => EventCard(event, index))}
      </div>
      <h2 className="subheading bg-cambridge p-1 text-white">Archiv</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-5 gap-4  py-4">
        {archive.map((event, index) => EventCard(event, index))}
      </div>
    </div>
  );
}
