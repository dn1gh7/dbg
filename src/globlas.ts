export type SocietyEvent = {
  id: string;
  title: string;
  text: string;
  imgPaths: string[];
  invitePdfPath: string;
  programPdfPath: string;
  startDate: number;
  endDate?: number;
  /** Optional hero/thumbnail for cards (Strapi media or absolute URL). */
  cardImageUrl?: string;
};

export type PresidiumMember = {
  title?: string;
  name: string;
};

export const STATIC_EVENTS: SocietyEvent[] = [
  {
    id: '1',
    title: 'Mitgliederreise nach Svištov und Ruse + Mitgliederversammlung',
    text: '',
    imgPaths: [''],
    invitePdfPath: '',
    programPdfPath: '',
    startDate: Date.UTC(2023, 9, 15, 3, 0, 0),
    endDate: Date.UTC(2023, 9, 19, 3, 0, 0),
  },
  {
    id: '2',
    title: 'Jahressymposium und Mitgliederversammlung ',
    text: '',
    imgPaths: [''],
    invitePdfPath: '',
    programPdfPath: '',
    startDate: Date.UTC(2024, 3, 5, 3, 0, 0),
    endDate: Date.UTC(2024, 3, 6, 3, 0, 0),
  },
  {
    id: '3',
    title: '9. Deutsch-Bulgarischer Geschichtstag',
    text: 'Am 9. November 2024 fand auf Schloss Heiligenberg in Seeheim-Jugenheim auf Einladung des Deutsch-Bulgarischen Geschichtsvereins Pamet in Zusammenarbeit mit der Deutsch-Bulgarischen Elterninitiative Jan Bibijan und der Deutsch-Bulgarischen Gesellschaft zur Förderung der Beziehungen zwischen Deutschland und Bulgarien e.V. der 9. Deutsch-Bulgarische Geschichtstag statt. Das reichhaltige Programm versprach historische und gegenwartsbezogene brisante Beiträge. Teilnehmende aus Bulgarien, Tschechien, Österreich und Deutschland waren der Einladung gefolgt. Ausführlichere Informationen zur Veranstaltung finden Sie im Bericht zum 9. Deutsch-Bulgarischen Geschichtstag.',
    imgPaths: [''],
    invitePdfPath: '',
    programPdfPath: '',
    startDate: Date.UTC(2024, 10, 9, 3, 0, 0),
  },
  {
    id: '4',
    title:
      'Südosteuropa-Abend zum Thema Die Ära Battenberg (1879-1886) und ihre Verortung im heutigen kollektiven Gedächtnis Bulgariens',
    text: '',
    imgPaths: [''],
    invitePdfPath: '',
    programPdfPath: '',
    startDate: Date.UTC(2023, 5, 28, 3, 0, 0),
  },
  {
    id: '5',
    title:
      'Jahressymposium zum Thema Historische Traditionen der deutsch-bulgarischen Kultur- und Wissenschaftskooperation und ihre gegenwärtigen Herausforderungen + Mitgliederversammlung',
    text: '',
    imgPaths: [''],
    invitePdfPath: '',
    programPdfPath: '',
    startDate: Date.UTC(2023, 3, 21, 3, 0, 0),
    endDate: Date.UTC(2023, 3, 22, 3, 0, 0),
  },
  {
    id: '6',
    title:
      'Jahressymposium zum Thema Die Donau als wirtschaftliche, kulturhistorische und politische Verbindungsader zwischen Mittel- und Südosteuropa in Vergangenheit und Gegenwart + Mitgliederversammlung',
    text: '',
    imgPaths: [''],
    invitePdfPath: '',
    programPdfPath: '',
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
    invitePdfPath: '',
    programPdfPath:
      '/events/DBG-Tagungsprogramm 24.4.2026 - Universität Jena.pdf',
    startDate: Date.UTC(2026, 3, 24, 3, 0, 0),
  },
  {
    id: '8',
    title:
      'Expertengespräch: Der Berliner Kongress von 1878 und seine Auswirkungen bis heute',
    text: `
Verehrte Mitglieder und Freunde des Deutsch-Bulgarischen Forums,
weshalb führt Russland seinen imperialen Krieg gegen die Ukraine sowie auch hybrid gegen Europa und die westliche Weltordnung?
Welche Politikoptionen haben die Europäer
in dieser Konfrontation? Wodurch werden deutsche Gestaltungsspielräume bestimmt oder
eingeengt? Welche Gesichtspunkte beeinflussen dabei das Denken unserer Partner in
Ost- und Südosteuropa?
Wesentliche Weichen wurden schon vor langer Zeit in Berlin gestellt und spielen weiterhin
entscheidende Rollen.
Diese Fragen beleuchten wir am 19. März um 17h00 bei unserem Expertengespräch.
    `,
    imgPaths: [''],
    invitePdfPath: '/events/DBF_Einladung_Berliner_Kongress.pdf',
    programPdfPath: '',
    startDate: Date.UTC(2026, 2, 19, 3, 0, 0),
  },
  {
    id: '9',
    title: 'Einladung zur Mitgliederversammlung',
    text: `
Sehr geehrte Mitglieder, 
zu unserer Mitgliederversammlung 2026 möchte ich Sie hiermit herzlich im Namen des Präsidiums der DBG einladen. 

Ort: 07743 Jena, Haus auf der Mauer, Johannisplatz 26 
Zeit: Samstag, den 25.April 2026, 10:00 Uhr
    `,
    imgPaths: [''],
    invitePdfPath:
      '/events/Einladung zur Mitgliederversammlung der DBG 25.4.2026 Universität Jena.pdf',
    programPdfPath: '',
    startDate: Date.UTC(2026, 3, 25, 3, 0, 0),
  },
];

export const STATIC_PRESIDIUM: PresidiumMember[] = [
  { title: 'Präsidentin', name: 'Dr. S. Comati' },
  { title: 'Vizepräsident', name: 'Prof. Dr. R. Krauß' },
  { title: 'Geschäftsführerin', name: 'S. Lefèvre' },
  { name: 'Prof. Dr. Dres.h.c. Th. Kahl' },
  { name: 'Priv.-Doz. Dr. M. Henzelmann' },
  { name: 'Prof. Dr. N. Kühn-Velten' },
  { title: 'Ehrenpräsident', name: 'Prof. Dr. Dr.h.c. H. Schaller' },
];

export const EVENTS = STATIC_EVENTS;
export const PRESIDIUM = STATIC_PRESIDIUM;
