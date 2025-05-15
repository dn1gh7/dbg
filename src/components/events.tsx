import { BASE_URL } from '../globlas';

type Event = {
  title: string;
  imgPaths: string[];
  pdfPath: string;
  startDate: Date;
  endDate?: Date;
};

export default function Events() {
  const events = [
    { title: 'Beispiel Event 1', imgPaths: [''], pdfPath: '', startDate: '' },
    { title: 'Beispiel Event 2', imgPaths: [''], pdfPath: '' },
  ];
  return (
    <>
      <h2 className="heading">Aktuell</h2>
      <div className="flex flex-col md:flex-row space-y-3 md:space-x-10 py-4">
        {events.map((e) => (
          <div className="flex flex-col border-[#2e2f2f] border-4 rounded-md h-75 w-75">
            <img
              src={BASE_URL + '/Cyril-methodius-small.jpg'}
              className="h-1/2 object-cover object-top"
              alt=""
            />
            <div className="flex flex-col p-2  h-1/2 justify-between">
              <h2 className="subheading">{e.title}</h2>
              <div className="flex items-center">
                <span>
                  {new Date(Date.UTC(2012, 11, 20, 3, 0, 0)).toLocaleDateString(
                    'de-DE'
                  )}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d64933"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12.1" cy="12.1" r="1" />
                </svg>

                <span>
                  {new Date(Date.UTC(2012, 11, 20, 3, 0, 0)).toLocaleDateString(
                    'de-DE'
                  )}
                </span>
              </div>
              <a
                href=""
                className=" w-fit rounded-md p-2 bg-[#d64933] text-white"
              >
                Einladung
              </a>
            </div>
          </div>
        ))}
      </div>
      <h2>Archiv</h2>
    </>
  );
}
