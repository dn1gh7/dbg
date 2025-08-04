import { Link } from 'react-router';
import { Event } from '../globlas';

export const EventCard = (event: Event, index: number) => {
  return (
    <Link to={`/events/${event.id}`} key={index}>
      <div
        key={index}
        className="flex flex-col border-[#2e2f2f] hover:outline-solid hover:outline-2 hover:outline-periwinkleh outline-offset-2 border-2 rounded-md overflow-hidden"
      >
        <img
          src={'/Cyril-methodius-small.jpg'}
          className="h-20 object-cover object-top"
          alt=""
        />
        <div className="flex flex-col p-2  h-1/2 justify-between">
          <h2 className="line-clamp-2">{event.title}</h2>
          <div className="flex items-center">
            <span>{new Date(event.startDate).toLocaleDateString('de-DE')}</span>
            {event.endDate && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#82c09a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12.1" cy="12.1" r="1" />
                </svg>
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
