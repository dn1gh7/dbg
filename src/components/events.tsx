// import { useState } from 'react';

// interface Event {
//   title: string;
//   imgPaths: string[];
//   pdfPath: string;
// }

export default function Events() {
  const events = [
    { title: 'Beispiel Event 1', imgPaths: [''], pdfPath: '' },
    { title: 'Beispiel Event 2', imgPaths: [''], pdfPath: '' },
  ];
  return (
    <>
      <h2>Aktuelle Veranstaltungen</h2>
      <div className="flex md:flex-row ">
        {events.map((e) => (
          <div className="h-50 w-50 bg-green-500 p-5 my-10 mr-5">
            <h2>{e.title}</h2>
          </div>
        ))}
      </div>
      <h2>Archiv</h2>
    </>
  );
}
