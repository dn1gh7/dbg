export type Event = {
  id: string;
  title: string;
  text: string;
  imgPaths: string[];
  pdfPath: string;
  startDate: Date;
  endDate?: Date;
};

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Mitgliederreise nach Svištov und Ruse + Mitgliederversammlung',
    text: '',
    imgPaths: [''],
    pdfPath: '',
    startDate: new Date(Date.UTC(2023, 9, 15, 3, 0, 0)),
    endDate: new Date(Date.UTC(2023, 9, 19, 3, 0, 0)),
  },
  {
    id: '2',
    title: 'Jahressymposium und Mitgliederversammlung ',
    text: '',
    imgPaths: [''],
    pdfPath: '',
    startDate: new Date(Date.UTC(2024, 3, 5, 3, 0, 0)),
    endDate: new Date(Date.UTC(2024, 3, 6, 3, 0, 0)),
  },
  //9. November 2024
  {
    id: '3',
    title: '9. Deutsch-Bulgarischer Geschichtstag',
    text: 'Am 9. November 2024 fand auf Schloss Heiligenberg in Seeheim-Jugenheim auf Einladung des Deutsch-Bulgarischen Geschichtsvereins Pamet in Zusammenarbeit mit der Deutsch-Bulgarischen Elterninitiative Jan Bibijan und der Deutsch-Bulgarischen Gesellschaft zur Förderung der Beziehungen zwischen Deutschland und Bulgarien e.V. der 9. Deutsch-Bulgarische Geschichtstag statt. Das reichhaltige Programm versprach historische und gegenwartsbezogene brisante Beiträge. Teilnehmende aus Bulgarien, Tschechien, Österreich und Deutschland waren der Einladung gefolgt. Ausführlichere Informationen zur Veranstaltung finden Sie im Bericht zum 9. Deutsch-Bulgarischen Geschichtstag.',
    imgPaths: [''],
    pdfPath: '',
    startDate: new Date(Date.UTC(2024, 10, 9, 3, 0, 0)),
  },
  {
    id: '4',
    title:
      'Südosteuropa-Abend zum Thema Die Ära Battenberg (1879-1886) und ihre Verortung im heutigen kollektiven Gedächtnis Bulgariens',
    text: '',
    imgPaths: [''],
    pdfPath: '',
    startDate: new Date(Date.UTC(2023, 5, 28, 3, 0, 0)),
  },
  {
    id: '5',
    title:
      'Jahressymposium zum Thema Historische Traditionen der deutsch-bulgarischen Kultur- und Wissenschaftskooperation und ihre gegenwärtigen Herausforderungen + Mitgliederversammlung',
    text: '',
    imgPaths: [''],
    pdfPath: '',
    startDate: new Date(Date.UTC(2023, 3, 21, 3, 0, 0)),
    endDate: new Date(Date.UTC(2023, 3, 22, 3, 0, 0)),
  },
  {
    id: '6',
    title:
      'Jahressymposium zum Thema Die Donau als wirtschaftliche, kulturhistorische und politische Verbindungsader zwischen Mittel- und Südosteuropa in Vergangenheit und Gegenwart + Mitgliederversammlung',
    text: '',
    imgPaths: [''],
    pdfPath: '',
    startDate: new Date(Date.UTC(2022, 4, 20, 3, 0, 0)),
  },
];

export const PRESIDIUM = [
  { title: 'Präsidentin', name: 'Dr. S. Comati' },
  { title: 'Vizepräsident', name: 'Prof. Dr. R. Krauß' },
  { title: 'Geschäftsführerin', name: 'S. Lefèvre' },
  { name: 'Prof. Dr. Dr.h.c. Th. Kahl' },
  { name: 'Priv.-Doz. Dr. M. Henzelmann' },
  { name: 'Prof. Dr. N. Kühn-Velten' },
  { title: 'Ehrenpräsident', name: 'Prof. Dr. Dr.h.c. H. Schaller' },
];
