import { ImageOff } from 'lucide-react';

/**
 * The image at the top of an overview card. Entries without a preview image get a
 * neutral placeholder rather than a stand-in photograph, which would otherwise read as
 * if it belonged to that entry.
 */
export default function CardThumb({ src }: { src?: string }) {
  if (src) {
    return <img src={src} className="h-28 w-full object-cover object-top" alt="" />;
  }

  return (
    <div
      className="flex h-28 w-full items-center justify-center bg-brand-50 text-brand-300"
      aria-hidden="true"
    >
      <ImageOff className="h-8 w-8" strokeWidth={1.5} />
    </div>
  );
}
