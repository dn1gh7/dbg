/**
 * The content the site shipped with before it had a CMS, in the shape the Strapi
 * content types expect. Mirrors src/globals.ts,
 * src/components/publications1/publications_paths.ts and
 * src/components/links/linkCollection.ts, which remain the offline fallbacks.
 *
 * Asset paths point at the site's own public/ folder. Once files are uploaded into
 * Strapi's media library the media fields take precedence — see mapStrapiPublication
 * and mapStrapiEvent in src/lib/strapi/.
 */

export type SeedEvent = {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  invitePdfUrl?: string;
  programPdfUrl?: string;
};

export type SeedPresidiumMember = {
  name: string;
  roleTitle?: string;
  sortOrder: number;
};

export type SeedPublication = {
  title: string;
  description?: string;
  category: 'bulgarica' | 'bibliothek' | 'forum';
  sortOrder: number;
  coverImageUrl?: string;
  pdfVerzeichnisUrl?: string;
  pdfInfoUrl?: string;
  pdfExternal?: string;
  showOnHome?: boolean;
  homeOrder?: number;
};

export type SeedLinkSection = {
  title: string;
  sortOrder: number;
  rows: { text: string; url: string }[];
};

export const EVENTS: SeedEvent[] = [
  {
    title: 'Mitgliederreise nach Svištov und Ruse + Mitgliederversammlung',
    description: '',
    startDate: '2023-10-15',
    endDate: '2023-10-19',
  },
  {
    title: 'Jahressymposium und Mitgliederversammlung',
    description: '',
    startDate: '2024-04-05',
    endDate: '2024-04-06',
  },
  {
    title: '9. Deutsch-Bulgarischer Geschichtstag',
    description:
      'Am 9. November 2024 fand auf Schloss Heiligenberg in Seeheim-Jugenheim auf Einladung des Deutsch-Bulgarischen Geschichtsvereins Pamet in Zusammenarbeit mit der Deutsch-Bulgarischen Elterninitiative Jan Bibijan und der Deutsch-Bulgarischen Gesellschaft zur Förderung der Beziehungen zwischen Deutschland und Bulgarien e.V. der 9. Deutsch-Bulgarische Geschichtstag statt. Das reichhaltige Programm versprach historische und gegenwartsbezogene brisante Beiträge. Teilnehmende aus Bulgarien, Tschechien, Österreich und Deutschland waren der Einladung gefolgt. Ausführlichere Informationen zur Veranstaltung finden Sie im Bericht zum 9. Deutsch-Bulgarischen Geschichtstag.',
    startDate: '2024-11-09',
  },
  {
    title:
      'Südosteuropa-Abend zum Thema Die Ära Battenberg (1879-1886) und ihre Verortung im heutigen kollektiven Gedächtnis Bulgariens',
    description: '',
    startDate: '2023-06-28',
  },
  {
    title:
      'Jahressymposium zum Thema Historische Traditionen der deutsch-bulgarischen Kultur- und Wissenschaftskooperation und ihre gegenwärtigen Herausforderungen + Mitgliederversammlung',
    description: '',
    startDate: '2023-04-21',
    endDate: '2023-04-22',
  },
  {
    title:
      'Jahressymposium zum Thema Die Donau als wirtschaftliche, kulturhistorische und politische Verbindungsader zwischen Mittel- und Südosteuropa in Vergangenheit und Gegenwart + Mitgliederversammlung',
    description: '',
    startDate: '2022-05-20',
  },
  {
    title: 'Ankündigung der Jahrestagung 2026 der DBG an der Universität Jena',
    description: `Ort: Friedrich-Schiller-Universität Jena, Institut für Slawistik und Kaukasusstudien, 07743 Jena, Ernst-Abbe-Platz 8

Das Arbeitsthema der Tagung „BULGARISCHE VOLKSKULTUR EINST UND JETZT“ wurde gemeinsam mit unserem Gastgeber, Prof. Dr. Dr. h.c. Thede Kahl, erarbeitet. Es greift folgende Schwerpunkte auf:

- Grundlegende Forschungen zur bulgarischen Folklore (Überblick zu den wichtigsten Werken des 18. und 19. Jahrhunderts)
- Sprach- und literaturwissenschaftliche Betrachtungen zur bulgarischen Folklore
- Bulgarische Volkskultur und Volksmusik (inklusive moderner Bezüge)
- Traditionelle und aktuelle Formen
- Wechselwirkungen mit Politik, Migration und Identität
- Verflechtung von folkloristischer Tradition und Aberglaube
- Farbsymbolik in der bulgarischen Folklore
- Humor in der bulgarischen Folklore

Es gibt mit Sicherheit noch eine ganze Reihe – auch eigener Beobachtungen – die in diesem Rahmen vorgetragen werden können! In den letzten Jahrzehnten wurden auch interkulturelle Aspekte mit eingebracht, die neue Betrachtungsweise eröffnet haben. Ein spannendes Gebiet!

Beitragsmeldungen mit einer kurzen Zusammenfassung werden bis Ende Februar 2026 erbeten.`,
    startDate: '2026-04-24',
    programPdfUrl: '/events/DBG-Tagungsprogramm 24.4.2026 - Universität Jena.pdf',
  },
  {
    title:
      'Expertengespräch: Der Berliner Kongress von 1878 und seine Auswirkungen bis heute',
    description: `Verehrte Mitglieder und Freunde des Deutsch-Bulgarischen Forums,

weshalb führt Russland seinen imperialen Krieg gegen die Ukraine sowie auch hybrid gegen Europa und die westliche Weltordnung? Welche Politikoptionen haben die Europäer in dieser Konfrontation? Wodurch werden deutsche Gestaltungsspielräume bestimmt oder eingeengt? Welche Gesichtspunkte beeinflussen dabei das Denken unserer Partner in Ost- und Südosteuropa?

Wesentliche Weichen wurden schon vor langer Zeit in Berlin gestellt und spielen weiterhin entscheidende Rollen.

Diese Fragen beleuchten wir am 19. März um 17h00 bei unserem Expertengespräch.`,
    startDate: '2026-03-19',
    invitePdfUrl: '/events/DBF_Einladung_Berliner_Kongress.pdf',
  },
  {
    title: 'Einladung zur Mitgliederversammlung',
    description: `Sehr geehrte Mitglieder,

zu unserer Mitgliederversammlung 2026 möchte ich Sie hiermit herzlich im Namen des Präsidiums der DBG einladen.

Ort: 07743 Jena, Haus auf der Mauer, Johannisplatz 26
Zeit: Samstag, den 25. April 2026, 10:00 Uhr`,
    startDate: '2026-04-25',
    invitePdfUrl:
      '/events/Einladung zur Mitgliederversammlung der DBG 25.4.2026 Universität Jena.pdf',
  },
];

export const PRESIDIUM: SeedPresidiumMember[] = [
  { roleTitle: 'Präsidentin', name: 'Dr. S. Comati', sortOrder: 0 },
  { roleTitle: 'Vizepräsident', name: 'Prof. Dr. R. Krauß', sortOrder: 1 },
  { roleTitle: 'Geschäftsführerin', name: 'S. Lefèvre', sortOrder: 2 },
  { name: 'Prof. Dr. Dres. h.c. Th. Kahl', sortOrder: 3 },
  { name: 'Priv.-Doz. Dr. M. Henzelmann', sortOrder: 4 },
  { name: 'Prof. Dr. N. Kühn-Velten', sortOrder: 5 },
  { roleTitle: 'Ehrenpräsident', name: 'Prof. Dr. Dr. h.c. H. Schaller', sortOrder: 6 },
];

export const PUBLICATIONS: SeedPublication[] = [
  {
    title: 'Bulgarica 1',
    category: 'bulgarica',
    sortOrder: 0,
    coverImageUrl: '/publications/9783954770779_g.jpg',
    pdfVerzeichnisUrl: '/publications/9783954770779_v.pdf',
  },
  {
    title: 'Bulgarica 2',
    category: 'bulgarica',
    sortOrder: 1,
    coverImageUrl: '/publications/9783954770915_g.jpg',
    pdfVerzeichnisUrl: '/publications/9783954770915_v.pdf',
    pdfInfoUrl: '/publications/9783954770915_f.pdf',
  },
  {
    title: 'Bulgarica 3',
    category: 'bulgarica',
    sortOrder: 2,
    coverImageUrl: '/publications/9783954771097_g.jpg',
    pdfVerzeichnisUrl: '/publications/9783954771097_v.pdf',
    pdfInfoUrl: '/publications/9783954771097_f.pdf',
  },
  {
    title: 'Bulgarica 4',
    category: 'bulgarica',
    sortOrder: 3,
    coverImageUrl: '/publications/9783954771370_g.jpg',
    pdfVerzeichnisUrl: '/publications/9783954771370_v.pdf',
    pdfInfoUrl: '/publications/9783954771370_f.pdf',
  },
  {
    title: 'Bulgarica 5',
    category: 'bulgarica',
    sortOrder: 4,
    coverImageUrl: '/publications/9783954771516_g.jpg',
    pdfVerzeichnisUrl: '/publications/9783954771516_v.pdf',
    pdfInfoUrl: '/publications/9783954771516_f.pdf',
  },
  {
    title: 'Bulgarica 6',
    category: 'bulgarica',
    sortOrder: 5,
    coverImageUrl: '/publications/9783954771769_g.jpg',
    pdfVerzeichnisUrl: '/publications/Bulgarica6-Inhalt.pdf',
    pdfInfoUrl: '/publications/Bulgarica6-Info.pdf',
    showOnHome: true,
    homeOrder: 1,
  },
  {
    title: 'Bulgarica 7',
    category: 'bulgarica',
    sortOrder: 6,
    coverImageUrl: '/publications/bulgarica_7.jpg',
    pdfVerzeichnisUrl: '/publications/Bulgarica7-Inhalt.pdf',
    pdfInfoUrl: '/publications/Bulgarica7-Info.pdf',
    showOnHome: true,
    homeOrder: 0,
  },
  {
    title: 'Bibliothek 21',
    category: 'bibliothek',
    sortOrder: 0,
    coverImageUrl: '/publications/9783954770786_g.jpg',
    pdfVerzeichnisUrl: '/publications/9783954770786_v.pdf',
    pdfInfoUrl: '/publications/9783954770786_f.pdf',
  },
  {
    title: 'Bibliothek 22',
    category: 'bibliothek',
    sortOrder: 1,
    coverImageUrl: '/publications/9783954771103_g.jpg',
    pdfVerzeichnisUrl: '/publications/9783954771103_v.pdf',
    pdfInfoUrl: '/publications/9783954771103_f.pdf',
  },
  {
    title: 'Bibliothek 23',
    category: 'bibliothek',
    sortOrder: 2,
    coverImageUrl: '/publications/9783954771110_g.jpg',
    pdfVerzeichnisUrl: '/publications/9783954771110_v.pdf',
    pdfInfoUrl: '/publications/9783954771110_f.pdf',
  },
  {
    title: 'Wendezeiten: Erfahrungen – Erwartungen – Erzählungen',
    description:
      'Die wissenschaftlichen Beiträge zur 7. Internationalen Konferenz des Bulgarischen Germanistenverbands, veranstaltet an der Universität Paisii Hilendarski in Plovdiv mit Unterstützung des DAAD, konnten 2023 unter dem Titel „Wendezeiten: Erfahrungen – Erwartungen – Erzählungen“ publiziert werden. Zu diesem Sammelband ist kürzlich in der von der Universität St. Kliment Ohridski in Sofia herausgegebenen Zeitschrift „Philologia“ eine ausführliche Rezension erschienen.',
    category: 'forum',
    sortOrder: 0,
    coverImageUrl: '/publications/0204-8779_2025_1_47_cover.jpg',
    pdfExternal:
      'https://philologia-journal.uni-sofia.bg/bg/article/0204-8779_2025_1_47_161-168',
    showOnHome: true,
    homeOrder: 2,
  },
];

export const LINK_SECTIONS: SeedLinkSection[] = [
  {
    title: 'Deutsch-bulgarische Gesellschaften/Vereine in Deutschland',
    sortOrder: 0,
    rows: [
      { text: 'Deutsch-Bulgarische Gesellschaft Dresden e. V.', url: 'https://www.dbg-dresden.com/' },
      { text: 'Deutsch-Bulgarische Gesellschaft Leipzig e. V.', url: 'http://www.dbg-leipzig.de/' },
      { text: 'Deutsch-Bulgarische Gesellschaft Darmstadt e. V.', url: 'http://www.dbgd.de/' },
      { text: 'Deutsch-Bulgarische Gesellschaft Donau e. V.', url: 'https://www.donau-nrw.de/de/home-bg/' },
      { text: 'Deutsch-Bulgarische Vereinigung in Bayern e. V.', url: 'http://www.deutsch-bulgarische-vereinigung.de/' },
      { text: 'Deutsch-Bulgarische Gesellschaft Dunav e. V.', url: 'https://dbg-dunav.de' },
      { text: 'Deutsch-Bulgarisches Forum e. V.', url: 'https://deutsch-bulgarisches-forum.de/' },
      { text: 'Südosteuropa-Gesellschaft e. V.', url: 'https://www.sogde.org/' },
      { text: 'Bulgarisches Kulturinstitut in Berlin', url: 'https://www.bulgarisches-kulturinstitut.de/' },
    ],
  },
  {
    title: 'Bulgarisch an Universitäten',
    sortOrder: 1,
    rows: [
      { text: 'Universität Trier', url: 'https://www.uni-trier.de/universitaet/fachbereiche-faecher/fachbereich-ii/faecher/slavistik' },
      { text: 'Friedrich-Schiller-Universität Jena', url: 'https://www.gw.uni-jena.de/slawkauk' },
      { text: 'Universität zu Köln', url: 'https://slavistik.phil-fak.uni-koeln.de/' },
      { text: 'Humboldt-Universität zu Berlin', url: 'https://www.slawistik.hu-berlin.de/de' },
      { text: 'Universität Heidelberg', url: 'https://www.slav.uni-heidelberg.de/studium/bulgaristik.html' },
      { text: 'Ludwig-Maximilians-Universität München', url: 'https://www.slavistik.uni-muenchen.de/index.html' },
      { text: 'Universität Freiburg', url: 'https://www.slavistik.uni-freiburg.de/studium/sprachen/bulgarisch' },
      { text: 'Georg-August-Universität Göttingen', url: 'https://www.uni-goettingen.de/de/50802.html' },
      { text: 'Universität Bamberg', url: 'https://www.uni-bamberg.de/slavistik/institut/' },
      { text: 'Universität Regensburg', url: 'https://www.uni-regensburg.de/europaeum/bulgarisch-kompakt/index.html' },
    ],
  },
  {
    title: 'Botschaft der Republik Bulgarien in Deutschland',
    sortOrder: 2,
    rows: [
      { text: 'Botschaft der Republik Bulgarien in Deutschland', url: 'https://mfa.bg/embassies/germany/' },
    ],
  },
  {
    title: 'Honorarkonsulate der Republik Bulgarien in Deutschland',
    sortOrder: 3,
    rows: [
      { text: 'Hamburg und Schleswig-Holstein', url: 'https://www.bulgarischeskonsulat-hamburg.de' },
      { text: 'Hessen', url: 'https://www.honorarkonsul-bulgarien-hessen.de' },
      { text: 'Nordrhein-Westfalen', url: 'https://www.bulgarien-nrw.de/' },
      { text: 'Sachsen-Anhalt', url: 'https://www.honorarkonsul-in-sachsen-anhalt.de' },
      { text: 'Rheinland-Pfalz', url: 'https://honorarkonsul-bulgarien-rlp.de/' },
      { text: 'Sachsen', url: 'https://www.honorarkonsul-bulgarien-sachsen.de' },
    ],
  },
  {
    title: 'Verlage',
    sortOrder: 4,
    rows: [
      { text: 'Verlag Frank & Timme', url: 'https://www.frank-timme.de/de' },
      { text: 'Akademische Verlagsgemeinschaft München', url: 'https://www.avm-verlag.de/' },
    ],
  },
];
