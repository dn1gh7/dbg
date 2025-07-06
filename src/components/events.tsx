import { useMemo } from 'react';
import { EVENTS } from '../globlas';
import { Link } from 'react-router';

type Event = {
  id: string;
  title: string;
  text: string;
  imgPaths: string[];
  pdfPath: string;
  startDate: Date;
  endDate?: Date;
};

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

    return { aktuell, archiv };
  }, [EVENTS]);

  return (
    <div className="body-text">
      <h2 className="subheading bg-cambridge p-1 text-white">Aktuell</h2>
      <div className="flex flex-col md:flex-row flex-wrap space-y-3 md:space-x-10 py-4">
        {aktuell.map((event, index) => (
          <Link to={`/events/${event.id}`} key={index}>
            <div key={index}>
              <div className="flex flex-col border-[#2e2f2f] hover:outline-solid hover:outline-2 hover:outline-[#52A371] outline-offset-2 border-2 rounded-md h-55 md:w-75 overflow-hidden">
                <img
                  src={'/Cyril-methodius-small.jpg'}
                  className="h-1/2 object-cover object-top"
                  alt=""
                />
                <div className="flex flex-col p-2  h-1/2 justify-between">
                  <h2 className="">{event.title}</h2>
                  <div className="flex items-center">
                    <span>
                      {new Date(
                        Date.UTC(2012, 11, 20, 3, 0, 0)
                      ).toLocaleDateString('de-DE')}
                    </span>
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

                    <span>{event.startDate.toLocaleDateString('de-DE')}</span>
                  </div>
                  {/* <a
                    href=""
                    className=" w-fit rounded-md p-2 bg-cambridge text-white"
                  >
                    Einladung
                  </a> */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <h2 className="subheading bg-cambridge p-1 text-white">Archiv</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4  py-4">
        {archiv.map((event, index) => (
          <Link to={`/events/${event.id}`} key={index}>
            <div key={index}>
              <div className="flex flex-col  border-[#2e2f2f] border-2 rounded-md h-35 md:h-55 overflow-hidden">
                <img
                  src={'/Cyril-methodius-small.jpg'}
                  className="h-1/2 object-cover object-top"
                  alt=""
                />
                <div className="flex flex-col p-2  h-1/2 ">
                  <h2 className=" line-clamp-2">{event.title}</h2>
                  <div className="flex items-center">
                    <span>
                      {new Date(
                        Date.UTC(2012, 11, 20, 3, 0, 0)
                      ).toLocaleDateString('de-DE')}
                    </span>
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

                    <span>{event.startDate.toLocaleDateString('de-DE')}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
