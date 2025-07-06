import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Publication } from './publications';

import 'swiper/css';
import 'swiper/css/navigation';
import './swiper.css';

interface PublicationSwiperProps {
  publications: Publication[];
  themeColor: string;
  instanceId: string;
}

export default function PublicationSwiper({
  publications,
  themeColor,
  instanceId,
}: PublicationSwiperProps) {
  const nextClass = `swiper-button-next-${instanceId}`;
  const prevClass = `swiper-button-prev-${instanceId}`;
  const paginationClass = `swiper-pagination-${instanceId}`;

  return (
    <div className="flex flex-col ">
      <style>
        {`.${paginationClass} .swiper-pagination-bullet-active {
          background-color: ${themeColor} !important;
          }
        `}
      </style>
      <div className="self-center order-2">
        <div className={`${paginationClass}`}></div>
      </div>
      <div className="flex items-center order-1">
        <button
          className={`${prevClass} p-1 rounded-full`}
          style={{ backgroundColor: themeColor }}
        >
          <div className="w-3 h-3 md:w-5 md:h-5 bg-[url('/chevron-left.svg')] bg-no-repeat bg-center bg-contain"></div>
        </button>

        <Swiper
          className="min-w-0 w-fit"
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
          onSlideChange={() => console.log('slide change')}
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
          onSwiper={(swiper) => console.log(swiper)}
        >
          {publications.map((p, i) => (
            <SwiperSlide key={i} className="!flex justify-center">
              <div className="px-3 " onClick={() => console.log('moin')}>
                <img
                  className="w-full h-auto object-contain "
                  src={p.img_path}
                  alt={p.title}
                />
                <div className="flex space-x-2  pt-2">
                  {p.pdf_path1 && (
                    <a
                      style={{ backgroundColor: themeColor }}
                      className="flex-2 text-white px-2 py-0.5  text-center rounded-sm "
                      target="_blank"
                      href={p.pdf_path1}
                    >
                      Verzeichnis
                    </a>
                  )}

                  {p.pdf_path2 && (
                    <a
                      style={{ backgroundColor: themeColor }}
                      className={` flex-1 text-white px-2 py-0.5  text-center rounded-sm `}
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
          className={`${nextClass}  p-1 rounded-full`}
          style={{ backgroundColor: themeColor }}
        >
          <div className="w-3 h-3  md:w-5 md:h-5 bg-[url('/chevron-right.svg')] bg-no-repeat bg-center bg-contain"></div>
        </button>
      </div>
    </div>
  );
}
