import { EventCard } from './eventCard';
import { EVENTS, SocietyEvent } from '../globlas';
import { useMemo } from 'react';
import { others } from './publications1/publications_paths';
import PublicationCard from './publications1/publicationCard';

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
      <h1 className="black bg-cambridge text-white p-2 my-4">
        Aktuelle Veranstaltungen
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-5 gap-4  py-4">
        {currentEvents.map((event) => EventCard(event, 0))}
      </div>
      <h1 className="black bg-cambridge text-white p-2 my-4">
        Neues zum Lesen
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-5 gap-4  py-4">
        <img
          className="border-black border-1"
          src="/publications/9783954771769_g.jpg"
          alt=""
        />
        <PublicationCard publication={others[0]} />
      </div>
    </>
  );
}
