import type { CmsBlock } from '../lib/strapi/blocks';
import EventGallery from './eventGallery';
import StrapiRichText from './strapiRichText';

/**
 * Renders a Strapi dynamic zone: the editor decides what appears and in what order,
 * so a button row can sit between two paragraphs rather than only after them.
 *
 * Text and buttons keep the `measure` reading width; galleries deliberately break out
 * of it, matching how the event detail page has always laid them out.
 */
export default function ContentBlocks({
  blocks,
  title,
}: {
  blocks: CmsBlock[];
  /** The entry's title, used as gallery alt text where a block has no caption. */
  title: string;
}) {
  if (!blocks.length) return null;

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'richText':
            return (
              <div key={i} className="measure mx-auto mt-6 space-y-4">
                <StrapiRichText value={block.text} />
              </div>
            );

          case 'image':
            return (
              <figure key={i} className="measure mx-auto mt-8">
                <img
                  src={block.src}
                  alt={block.alt}
                  className="w-full rounded-sm border border-brand-200 shadow-sm"
                />
                {block.caption && (
                  <figcaption className="mt-2 text-sm text-ink-muted">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'gallery':
            return (
              <figure key={i} className="mt-8">
                <EventGallery images={block.images} title={block.caption || title} />
                {block.caption && (
                  <figcaption className="measure mx-auto mt-2 text-sm text-ink-muted">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'buttons':
            return (
              <div
                key={i}
                className="measure mx-auto mt-8 flex flex-wrap gap-3"
              >
                {block.buttons.map((button, j) => (
                  <a
                    key={j}
                    className="btn-primary"
                    href={button.href}
                    target="_blank"
                  >
                    {button.label}
                  </a>
                ))}
              </div>
            );
        }
      })}
    </>
  );
}
