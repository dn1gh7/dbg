import { Link } from 'react-router';
import { Publication } from './publications';

type PublicationCardProps = {
  publication: Publication;
  /** Where the cover links to — normally this title's anchor on the publications
   *  page, but an absolute URL is followed off-site instead. */
  linkTo?: string;
};

export default function PublicationCard({
  publication,
  linkTo,
}: PublicationCardProps) {
  const cover = (
    <img
      className="w-full h-auto object-contain rounded-sm border border-brand-200 shadow-sm"
      src={publication.img_path}
      alt={publication.title}
    />
  );

  const isExternal = linkTo !== undefined && /^https?:\/\//.test(linkTo);
  const coverLinkClass = `block rounded-sm transition-opacity hover:opacity-90
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600
    focus-visible:ring-offset-2`;

  const hasDownloads =
    publication.pdf_path || publication.pdf_path1 || publication.pdf_path2;

  return (
    <div>
      {linkTo === undefined && cover}
      {linkTo !== undefined &&
        (isExternal ? (
          <a href={linkTo} target="_blank" className={coverLinkClass}>
            {cover}
          </a>
        ) : (
          <Link to={linkTo} className={coverLinkClass}>
            {cover}
          </Link>
        ))}

      {hasDownloads && (
        <div className="flex flex-wrap gap-2 pt-3">
          {publication.pdf_path && (
            <a className="btn-pill" target="_blank" href={publication.pdf_path}>
              Zum Beitrag
            </a>
          )}
          {publication.pdf_path1 && (
            <a className="btn-pill" target="_blank" href={publication.pdf_path1}>
              Verzeichnis
            </a>
          )}
          {publication.pdf_path2 && (
            <a className="btn-pill" target="_blank" href={publication.pdf_path2}>
              Info
            </a>
          )}
        </div>
      )}
    </div>
  );
}
