import { useMemo } from 'react';
import { EVENTS } from '../globlas';
import { SocietyEvent } from '../globlas';
import { EventCard } from './eventCard';

export default function Events() {
  const today = new Date();

  const { current, archive } = useMemo(() => {
    const current: SocietyEvent[] = [];
    const archive: SocietyEvent[] = [];

    EVENTS.forEach((event) => {
      const eventDate = new Date(event.startDate);
      if (eventDate >= today) {
        current.push(event);
      } else {
        archive.push(event);
      }
    });
    archive.sort((a, b) => b.startDate - a.startDate);

    return { current, archive };
  }, [EVENTS]);

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
