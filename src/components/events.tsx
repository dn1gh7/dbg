import { BASE_URL } from '../globlas';

export default function Events() {
  const events = [
    { title: 'Beispiel Event 1', imgPaths: [''], pdfPath: '' },
    { title: 'Beispiel Event 2', imgPaths: [''], pdfPath: '' },
  ];
  return (
    <>
      <h2>Aktuelle Veranstaltungen</h2>
      <div className="flex md:flex-row">
        {events.map((e) => (
          <div className="flex flex-col border-[#b8ccf2] border-4 rounded-md my-10 mr-5 h-50 w-75">
            <img
              src={BASE_URL + '/Cyril-methodius-small.jpg'}
              className="h-1/2 object-cover object-top"
              alt=""
            />
            <h2>{e.title}</h2>
          </div>
        ))}
      </div>
      <h2>Archiv</h2>
    </>
  );
}
