import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

interface EventGalleryProps {
  images: string[];
  /** Used for the image alt text — the pictures have no captions of their own. */
  title: string;
}

export default function EventGallery({ images, title }: EventGalleryProps) {
  const showControls = images.length > 1;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {showControls && (
          <button
            type="button"
            aria-label="Vorheriges Bild"
            className="event-gallery-prev shrink-0 rounded-full bg-brand-600 p-1
              hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            <div className="h-3 w-3 bg-[url('/chevron-left.svg')] bg-contain bg-center bg-no-repeat md:h-5 md:w-5"></div>
          </button>
        )}

        <Swiper
          className="min-w-0 flex-1"
          loop={showControls}
          spaceBetween={15}
          slidesPerView={1}
          keyboard={{ enabled: true }}
          modules={[Navigation, Pagination, Keyboard]}
          pagination={
            showControls ? { el: '.event-gallery-pagination', clickable: true } : false
          }
          navigation={
            showControls
              ? { nextEl: '.event-gallery-next', prevEl: '.event-gallery-prev' }
              : false
          }
        >
          {images.map((src, i) => (
            <SwiperSlide key={src}>
              <img
                src={src}
                alt={
                  images.length > 1
                    ? `${title} – Bild ${i + 1} von ${images.length}`
                    : title
                }
                loading={i === 0 ? 'eager' : 'lazy'}
                className="h-[260px] w-full rounded-md border border-brand-200 bg-brand-50
                  object-contain sm:h-[420px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {showControls && (
          <button
            type="button"
            aria-label="Nächstes Bild"
            className="event-gallery-next shrink-0 rounded-full bg-brand-600 p-1
              hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            <div className="h-3 w-3 bg-[url('/chevron-right.svg')] bg-contain bg-center bg-no-repeat md:h-5 md:w-5"></div>
          </button>
        )}
      </div>

      {/* Pagination lives outside the Swiper so it sits under the image instead of on
          top of it, and so the publications page's global `.swiper-pagination` override
          cannot reposition it. */}
      {showControls && (
        <div className="event-gallery-pagination !static self-center text-center"></div>
      )}
    </div>
  );
}
