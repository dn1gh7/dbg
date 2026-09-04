import { Link } from 'react-router';

export default function NotFound() {
  return (
    <section>
      <p className="measure text-ink-muted">
        Die aufgerufene Seite existiert nicht. Möglicherweise wurde sie
        verschoben oder der Link enthält einen Tippfehler.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link className="btn-primary" to="/">
          Zur Startseite
        </Link>
        <Link className="btn-secondary" to="/events">
          Veranstaltungen
        </Link>
        <Link className="btn-secondary" to="/contact">
          Kontakt
        </Link>
      </div>
    </section>
  );
}
