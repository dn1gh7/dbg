import { useEffect, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Publication } from './publications';
import { publicationSlug } from './slug';

import 'swiper/css';
import 'swiper/css/navigation';
import './swiper.css';

interface PublicationSwiperProps {
  publications: Publication[];
  themeColor: string;
  instanceId: string;
  /** Slug of the publication the visitor followed a link to — that slide is brought
   *  to the front and outlined instead of leaving them on slide one. */
  focusSlug?: string;
}

export default function PublicationSwiper({
  publications,
  themeColor,
  instanceId,
  focusSlug,
}: PublicationSwiperProps) {
  const nextClass = `swiper-button-next-${instanceId}`;
  const prevClass = `swiper-button-prev-${instanceId}`;
  const paginationClass = `swiper-pagination-${instanceId}`;

  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  useEffect(() => {
    if (!swiper || swiper.destroyed || !focusSlug) return;
    const index = publications.findIndex(
      (p) => publicationSlug(p) === focusSlug
    );
    if (index >= 0) swiper.slideToLoop(index, 0);
  }, [swiper, focusSlug, publications]);

  return (
    <div className="flex flex-col ">
      <style>
        {`.${paginationClass} .swiper-pagination-bullet-active {
          background-color: ${themeColor} !important;
          }
          /* Themed per instance, so the nav buttons' colours live here rather than on
             the elements: an inline style outranks any :hover rule. */
          .${prevClass},
          .${nextClass} {
            background-color: ${themeColor};
            transition: background-color 200ms;
          }
          .${prevClass}:hover,
          .${nextClass}:hover {
            background-color: color-mix(in srgb, ${themeColor} 85%, black);
          }
        `}
      </style>
      <div className="self-center order-2">
        <div className={`${paginationClass}`}></div>
      </div>
      <div className="flex items-center order-1">
        <button
          className={`${prevClass} p-1 rounded-full cursor-pointer`}
          aria-label="Vorherige Publikation"
          type="button"
        >
          <div className="w-3 h-3 md:w-5 md:h-5 bg-[url('/chevron-left.svg')] bg-no-repeat bg-center bg-contain"></div>
        </button>

        <Swiper
          className="min-w-0 w-fit"
          onSwiper={setSwiper}
          observer={true}
          observeParents={true}
          parallax={true}
          loop={true}
          spaceBetween={15}
          slidesPerView={3}
          modules={[Navigation, Pagination]}
          pagination={{
            el: `.${paginationClass}`,
            clickable: true,
          }}
          navigation={{
            nextEl: `.${nextClass}`,
            prevEl: `.${prevClass}`,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {publications.map((p, i) => (
            <SwiperSlide key={i} className="!flex justify-center">
              <div className="px-3 ">
                <img
                  className={`w-full h-auto object-contain rounded-sm border shadow-sm ${
                    focusSlug && publicationSlug(p) === focusSlug
                      ? 'border-brand-600 ring-2 ring-brand-600'
                      : 'border-brand-200'
                  }`}
                  src={p.img_path}
                  alt={p.title}
                />
                {/* Deliberately not themeColor: these carry white text, and the light
                    blue only reaches 1.6:1 against it. */}
                <div className="flex gap-2 pt-3">
                  {p.pdf_path1 && (
                    <a
                      className="btn-pill flex-1"
                      target="_blank"
                      href={p.pdf_path1}
                    >
                      Verzeichnis
                    </a>
                  )}

                  {p.pdf_path2 && (
                    <a
                      className="btn-pill flex-1"
                      target="_blank"
                      href={p.pdf_path2}
                    >
                      Info
                    </a>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`${nextClass}  p-1 rounded-full cursor-pointer`}
          type="button"
          aria-label="Nächste Publikation"
        >
          <div className="w-3 h-3  md:w-5 md:h-5 bg-[url('/chevron-right.svg')] bg-no-repeat bg-center bg-contain"></div>
        </button>
      </div>
    </div>
  );
}
