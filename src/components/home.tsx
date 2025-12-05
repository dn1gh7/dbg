import { EventCard } from './eventCard';
import { EVENTS, SocietyEvent } from '../globlas';
import { useMemo } from 'react';

export default function Home() {
  const today = new Date();

  const currentEvents = useMemo(() => {
    const current: SocietyEvent[] = [];

    EVENTS.forEach((event) => {
      const eventDate = new Date(event.startDate);
      if (eventDate >= today) {
        current.push(event);
      }
    });
    current.sort((a, b) => b.startDate - a.startDate);

    return current;
  }, [EVENTS]);

  return (
    <>
      <h1 className="block  text-center h-1/2">
        Willkommen auf der Website der DBG
      </h1>
      <h1 className="black bg-cambridge text-white p-2 my-4">Aktuelles</h1>
      <div className="w-75">
        {currentEvents.map((event) => EventCard(event, 0))}
      </div>
      <h1 className="black bg-cambridge text-white p-2 my-4">
        Neueste Publikation
      </h1>
      <div>
        <img className="w-75" src="/publications/9783954771769_g.jpg" alt="" />
      </div>
    </>
  );
}
