import { EventCard } from './eventCard';
import { SocietyEvent } from '../globlas';
import { useMemo } from 'react';
import PublicationCard from './publications1/publicationCard';
import { useCmsEvents, useCmsHomeReading } from '../hooks/useCms';

export default function Home() {
  const { data: events } = useCmsEvents();
  const { data: readingItems } = useCmsHomeReading();

  const currentEvents = useMemo(() => {
    const today = new Date();
    const current: SocietyEvent[] = [];

    events.forEach((event) => {
      const eventDate = new Date(event.startDate);
      if (eventDate >= today) {
        current.push(event);
      }
    });
    current.sort((a, b) => b.startDate - a.startDate);

    return current;
  }, [events]);

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
        {readingItems.map((pub, i) => {
          const hasPdfLinks =
            (pub.pdf_path && pub.pdf_path.length > 0) ||
            (pub.pdf_path1 && pub.pdf_path1.length > 0) ||
            (pub.pdf_path2 && pub.pdf_path2.length > 0);
          if (hasPdfLinks) {
            return <PublicationCard key={i} publication={pub} />;
          }
          return (
            <img
              key={i}
              className="border-black border-1"
              src={pub.img_path}
              alt={pub.title}
            />
          );
        })}
      </div>
    </>
  );
}
