import { Link } from 'react-router';
import { useMemo } from 'react';
import { EventCard } from './eventCard';
import PublicationCard from './publications/publicationCard';
import type { Publication } from './publications/publications';
import { publicationSlug } from './publications/slug';
import { useCmsEvents, useCmsHomeReading } from '../hooks/useCms';
import { isUpcoming, startOfToday } from '../lib/strapi/events';

/** Where a "Neues zum Lesen" cover should lead.
 *
 * Only the Bulgarica and Bulgarische Bibliothek series are actually listed on the
 * publications page, so only those have an anchor to jump to. Anything else — a
 * review in an outside journal, say — links to its own source instead, and an entry
 * with neither is left unlinked rather than pointing at a page it is not on. */
function readingLink(publication: Publication): string | undefined {
  if (publication.category === 'bulgarica' || publication.category === 'bibliothek') {
    return `/publications#${publicationSlug(publication)}`;
  }
  return publication.pdf_path || undefined;
}

export default function Home() {
  const { data: events } = useCmsEvents();
  const { data: readingItems } = useCmsHomeReading();

  const currentEvents = useMemo(() => {
    const cutoff = startOfToday();
    return events
      .filter((event) => isUpcoming(event, cutoff))
      .sort((a, b) => a.startDate - b.startDate);
  }, [events]);

  return (
    <>
      <section>
        {/* The header bar shows no title on the landing page and the hero heading is
            gone, so this is the page's only <h1>. */}
        <h1 className="sr-only">Deutsch-Bulgarische Gesellschaft e. V.</h1>
        <p className="measure text-ink-muted">
          Wir fördern die wissenschaftlichen und kulturellen Beziehungen
          zwischen Deutschland und Bulgarien – mit Symposien, Vorträgen,
          Ausstellungen und eigenen Publikationsreihen.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn-primary" to="/membership">
            Mitglied werden
          </Link>
          <Link className="btn-secondary" to="/about">
            Über uns
          </Link>
        </div>
      </section>

      {/* `.section-heading` zeroes its own top margin as a first child, so the gap
          between the hero and the sections below it has to live on the sections. */}
      {currentEvents.length > 0 && (
        <section className="mt-10 md:mt-14">
          <h2 className="section-heading">Aktuelle Veranstaltungen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {currentEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {readingItems.length > 0 && (
        <section className="mt-10 md:mt-14">
          <div className="section-heading flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="subheading">Neues zum Lesen</h2>
            <Link to="/publications" className="btn-secondary shrink-0 text-sm">
              Alle Publikationen
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {readingItems.map((pub, i) => (
              <PublicationCard
                key={publicationSlug(pub) || i}
                publication={pub}
                linkTo={readingLink(pub)}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
