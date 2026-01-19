import { Publication } from './publications';

type PublicationCardProps = {
  publication: Publication;
};

export default function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <div className="px-3 " onClick={() => console.log('moin')}>
      <img
        className="w-full h-auto object-contain border-black border-1"
        src={publication.img_path}
        alt={publication.title}
      />
      <div className="flex space-x-2  pt-2">
        {publication.pdf_path && (
          <a
            className="flex-2 bg-cambridge text-white px-2 py-0.5  text-center rounded-sm "
            target="_blank"
            href={publication.pdf_path}
          >
            Zum Beitrag
          </a>
        )}
      </div>
    </div>
  );
}
