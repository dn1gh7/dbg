export type SocietyEvent = {
  id: string;
  title: string;
  text: string;
  imgPaths: string[];
  pdfPath: string;
  startDate: number;
  endDate?: number;
};

export const EVENTS: SocietyEvent[] = [
  {
    id: '1',
    title: 'Mitgliederreise nach Svištov und Ruse + Mitgliederversammlung',
    text: '',
    imgPaths: [''],
    pdfPath: '',
    startDate: Date.UTC(2023, 9, 15, 3, 0, 0),
    endDate: Date.UTC(2023, 9, 19, 3, 0, 0),
  },
  {
    id: '2',
    title: 'Jahressymposium und Mitgliederversammlung ',
    text: '',
    imgPaths: [''],
    pdfPath: '',
    startDate: Date.UTC(2024, 3, 5, 3, 0, 0),
    endDate: Date.UTC(2024, 3, 6, 3, 0, 0),
  },
  {
    id: '3',
    title: '9. Deutsch-Bulgarischer Geschichtstag',
    text: 'Am 9. November 2024 fand auf Schloss Heiligenberg in Seeheim-Jugenheim auf Einladung des Deutsch-Bulgarischen Geschichtsvereins Pamet in Zusammenarbeit mit der Deutsch-Bulgarischen Elterninitiative Jan Bibijan und der Deutsch-Bulgarischen Gesellschaft zur Förderung der Beziehungen zwischen Deutschland und Bulgarien e.V. der 9. Deutsch-Bulgarische Geschichtstag statt. Das reichhaltige Programm versprach historische und gegenwartsbezogene brisante Beiträge. Teilnehmende aus Bulgarien, Tschechien, Österreich und Deutschland waren der Einladung gefolgt. Ausführlichere Informationen zur Veranstaltung finden Sie im Bericht zum 9. Deutsch-Bulgarischen Geschichtstag.',
    imgPaths: [''],
    pdfPath: '',
    startDate: Date.UTC(2024, 10, 9, 3, 0, 0),
  },
  {
    id: '4',
    title:
      'Südosteuropa-Abend zum Thema Die Ära Battenberg (1879-1886) und ihre Verortung im heutigen kollektiven Gedächtnis Bulgariens',
    text: '',
    imgPaths: [''],
    pdfPath: '',
    startDate: Date.UTC(2023, 5, 28, 3, 0, 0),
  },
  {
    id: '5',
    title:
      'Jahressymposium zum Thema Historische Traditionen der deutsch-bulgarischen Kultur- und Wissenschaftskooperation und ihre gegenwärtigen Herausforderungen + Mitgliederversammlung',
    text: '',
    imgPaths: [''],
    pdfPath: '',
    startDate: Date.UTC(2023, 3, 21, 3, 0, 0),
    endDate: Date.UTC(2023, 3, 22, 3, 0, 0),
  },
  {
    id: '6',
    title:
      'Jahressymposium zum Thema Die Donau als wirtschaftliche, kulturhistorische und politische Verbindungsader zwischen Mittel- und Südosteuropa in Vergangenheit und Gegenwart + Mitgliederversammlung',
    text: '',
    imgPaths: [''],
    pdfPath: '',
    startDate: Date.UTC(2022, 4, 20, 3, 0, 0),
  },
  {
    id: '7',
    title: 'Ankündigung der Jahrestagung 2026 der DBG an der Universität Jena ',
    text: `
Ort: Friedrich - Schiller - Universität Jena, Institut für Slawistik und Kaukasusstudien, 07743 Jena, Ernst-Abbe-Platz 8
Das Arbeitsthema der Tagung „BULGARISCHE  VOLKSKULTUR  EINST  UND  JETZT“
wurde gemeinsam mit unserem Gastgeber, Prof. Dr. Dr. h.c. Thede Kahl, erarbeitet. Es greift folgende Schwerpunkte auf:
- Grundlegende Forschungen zur bulgarischen Folklore (Überblick zu den wichtigsten Werken des 18. und 19. Jahrhunderts)
- Sprach- und literaturwissenschaftliche Betrachtungen zur bulgarischen Folklore
- Bulgarische Volkskultur und Volksmusik (inklusive moderner Bezüge) 
- Traditionelle und aktuelle Formen
- Wechselwirkungen mit Politik, Migration und Identität
- Verflechtung von folkloristischer Tradition und Aberglaube
- Farbsymbolik in der bulgarischen Folklore
- Humor in der bulgarischen Folklore
Es gibt mit Sicherheit noch eine ganze Reihe – auch eigener Beobachtungen –
die in diesem Rahmen vorgetragen werden können! In den letzten Jahrzehnten
wurden auch interkulturelle Aspekte mit eingebracht, die neue Betrachtungsweise eröffnet haben. Ein spannendes Gebiet!

Beitragsmeldungen mit einer kurzen Zusammenfassung werden bis Ende Februar 2026 erbeten.
    `,
    imgPaths: [''],
    pdfPath: '',
    startDate: Date.UTC(2026, 3, 24, 3, 0, 0),
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
