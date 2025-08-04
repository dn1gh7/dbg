import { EventCard } from './eventCard';
import { EVENTS } from '../globlas';

export default function Home() {
  return (
    <>
      <h1 className="block  text-center h-1/2">
        Willkommen auf der Website der DBG
      </h1>
      <h1 className="black bg-cambridge text-white p-2 my-4">Aktuelles</h1>
      <div className="w-75">{EventCard(EVENTS[2], 0)}</div>
      <h1 className="black bg-cambridge text-white p-2 my-4">
        Neueste Publikation
      </h1>
      <div>
        <img className="w-75" src="/publications/9783954771769_g.jpg" alt="" />
      </div>
    </>
  );
}
