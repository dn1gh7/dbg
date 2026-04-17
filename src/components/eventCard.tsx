import { Link } from 'react-router';
import type { CmsEvent } from '../lib/strapi/events';

export const EventCard = (event: CmsEvent, index: number) => {
  const thumb =
    event.cardImageUrl ||
    (event.imgPaths[0] && event.imgPaths[0].length > 0
      ? event.imgPaths[0]
      : null) ||
    '/Cyril-methodius-small.jpg';

  return (
    <Link to={`/events/${event.id}`} key={index}>
      <div
        key={index}
        className="flex flex-col border-[#2e2f2f] hover:outline-solid hover:outline-2 hover:outline-periwinkleh outline-offset-2 border-2 rounded-md overflow-hidden"
      >
        <img
          src={thumb}
          className="h-20 object-cover object-top"
          alt=""
        />
        <div className="flex flex-col p-2  h-1/2 justify-between">
          <h2 className="line-clamp-2">{event.title}</h2>
          <div className="flex items-center">
            <span>{new Date(event.startDate).toLocaleDateString('de-DE')}</span>
            {event.endDate && (
              <>
                <span className="px-2 text-cambridge" aria-hidden="true">
                  &middot;
                </span>
                <span>
                  {new Date(event.endDate).toLocaleDateString('de-DE')}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
